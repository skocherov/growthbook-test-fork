import clsx from "clsx";
import {
  CSSProperties,
  ReactElement,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { CSSTransition } from "react-transition-group";
import { RxInfoCircled } from "react-icons/rx";
import { useGrowthBook } from "@growthbook/growthbook-react";
import {
  ExperimentReportVariation,
  ExperimentReportVariationWithIndex,
} from "back-end/types/report";
import { ExperimentStatus } from "back-end/types/experiment";
import {
  DifferenceType,
  PValueCorrection,
  StatsEngine,
} from "back-end/types/stats";
import {
  DEFAULT_P_VALUE_THRESHOLD,
  DEFAULT_STATS_ENGINE,
} from "shared/constants";
import { getValidDate } from "shared/dates";
import { FaExclamationTriangle } from "react-icons/fa";
import { Flex } from "@radix-ui/themes";
import { ExperimentMetricInterface, isFactMetric } from "shared/experiments";
import { useAuth } from "@/services/auth";
import {
  ExperimentTableRow,
  getEffectLabel,
  getRowResults,
  RowResults,
  useDomain,
} from "@/services/experiments";
import useOrgSettings from "@/hooks/useOrgSettings";
import { GBEdit } from "@/components/Icons";
import useConfidenceLevels from "@/hooks/useConfidenceLevels";
import usePValueThreshold from "@/hooks/usePValueThreshold";
import { useOrganizationMetricDefaults } from "@/hooks/useOrganizationMetricDefaults";
import { useCurrency } from "@/hooks/useCurrency";
import PValueColumn from "@/components/Experiment/PValueColumn";
import ChangeColumn from "@/components/Experiment/ChangeColumn";
import ResultsTableTooltip, {
  TooltipHoverSettings,
} from "@/components/Experiment/ResultsTableTooltip/ResultsTableTooltip";
import TimeSeriesButton from "@/components/TimeSeriesButton";
import { QueryStatusData } from "@/components/Queries/RunQueriesButton";
import { useDefinitions } from "@/services/DefinitionsContext";
import ResultsMetricFilter from "@/components/Experiment/ResultsMetricFilter";
import { ResultsMetricFilters } from "@/components/Experiment/Results";
import Tooltip from "@/components/Tooltip/Tooltip";
import { useResultsTableTooltip } from "@/components/Experiment/ResultsTableTooltip/useResultsTableTooltip";
import { SSRPolyfills } from "@/hooks/useSSRPolyfills";
import { AppFeatures } from "@/types/app-features";
import AlignedGraph from "./AlignedGraph";
import ExperimentMetricTimeSeriesGraphWrapper from "./ExperimentMetricTimeSeriesGraphWrapper";
import ChanceToWinColumn from "./ChanceToWinColumn";
import MetricValueColumn from "./MetricValueColumn";
import PercentGraph from "./PercentGraph";
import styles from "./ResultsTable.module.scss";

export type ResultsTableProps = {
  id: string;
  variations: ExperimentReportVariation[];
  variationFilter?: number[];
  baselineRow?: number;
  status: ExperimentStatus;
  queryStatusData?: QueryStatusData;
  isLatestPhase: boolean;
  startDate: string;
  endDate: string;
  rows: ExperimentTableRow[];
  dimension?: string;
  tableRowAxis: "metric" | "dimension";
  labelHeader: ReactElement | string;
  editMetrics?: () => void;
  renderLabelColumn: (
    label: string,
    metric: ExperimentMetricInterface,
    row: ExperimentTableRow,
    maxRows?: number
  ) => string | ReactElement;
  dateCreated: Date;
  hasRisk: boolean;
  statsEngine: StatsEngine;
  pValueCorrection?: PValueCorrection;
  differenceType: DifferenceType;
  sequentialTestingEnabled?: boolean;
  metricFilter?: ResultsMetricFilters;
  setMetricFilter?: (filter: ResultsMetricFilters) => void;
  metricTags?: string[];
  isTabActive: boolean;
  noStickyHeader?: boolean;
  noTooltip?: boolean;
  isBandit?: boolean;
  isGoalMetrics?: boolean;
  ssrPolyfills?: SSRPolyfills;
  disableTimeSeriesButton?: boolean;
};

const ROW_HEIGHT = 56;
const METRIC_LABEL_ROW_HEIGHT = 44;
const SPACER_ROW_HEIGHT = 6;

const percentFormatter = new Intl.NumberFormat(undefined, {
  style: "percent",
  maximumFractionDigits: 2,
});

export default function ResultsTable({
  id,
  isLatestPhase,
  status,
  queryStatusData,
  rows,
  dimension,
  tableRowAxis,
  labelHeader,
  editMetrics,
  variations,
  variationFilter,
  baselineRow = 0,
  startDate,
  endDate,
  renderLabelColumn,
  dateCreated,
  hasRisk,
  statsEngine,
  pValueCorrection,
  differenceType,
  sequentialTestingEnabled = false,
  metricFilter,
  setMetricFilter,
  metricTags = [],
  isTabActive,
  noStickyHeader,
  noTooltip,
  isBandit,
  ssrPolyfills,
  disableTimeSeriesButton,
}: ResultsTableProps) {
  // fix any potential filter conflicts
  if (variationFilter?.includes(baselineRow)) {
    variationFilter = variationFilter.filter((v) => v !== baselineRow);
  }

  const { getExperimentMetricById, getFactTableById } = useDefinitions();

  const _useOrganizationMetricDefaults = useOrganizationMetricDefaults();
  const { metricDefaults, getMinSampleSizeForMetric } =
    ssrPolyfills?.useOrganizationMetricDefaults?.() ||
    _useOrganizationMetricDefaults;

  const _confidenceLevels = useConfidenceLevels();
  const _pValueThreshold = usePValueThreshold();
  const _displayCurrency = useCurrency();
  const _orgSettings = useOrgSettings();

  const { ciUpper, ciLower } =
    ssrPolyfills?.useConfidenceLevels?.() || _confidenceLevels;
  const pValueThreshold =
    ssrPolyfills?.usePValueThreshold?.() || _pValueThreshold;
  const displayCurrency = ssrPolyfills?.useCurrency?.() || _displayCurrency;
  const orgSettings = ssrPolyfills?.useOrgSettings?.() || _orgSettings;

  const [showMetricFilter, setShowMetricFilter] = useState<boolean>(false);
  const [pValueSortDirection, setPValueSortDirection] = useState<"asc" | "desc" | null>(null);

  const tableContainerRef = useRef<HTMLDivElement | null>(null);
  const [graphCellWidth, setGraphCellWidth] = useState(800);
  const [tableCellScale, setTableCellScale] = useState(1);

  const gb = useGrowthBook<AppFeatures>();
  const { isAuthenticated } = useAuth();
  let showTimeSeriesButton =
    isAuthenticated &&
    baselineRow === 0 &&
    tableRowAxis === "metric" &&
    !disableTimeSeriesButton &&
    gb.isOn("experiment-results-timeseries");

  // Disable time series button for stopped experiments before we added this feature (& therefore data)
  if (status === "stopped" && endDate <= "2025-04-03") {
    showTimeSeriesButton = false;
  }

  const [visibleTimeSeriesMetricIds, setVisibleTimeSeriesMetricIds] = useState<
    string[]
  >([]);
  const toggleVisibleTimeSeriesMetricId = (metricId: string) => {
    setVisibleTimeSeriesMetricIds((prev) =>
      prev.includes(metricId)
        ? prev.filter((id) => id !== metricId)
        : [...prev, metricId]
    );
  };

  // Ensure we close all of them if dimension changes
  useEffect(() => {
    setVisibleTimeSeriesMetricIds([]);
  }, [tableRowAxis]);

  function onResize() {
    if (!tableContainerRef?.current?.clientWidth) return;
    const tableWidth = tableContainerRef.current?.clientWidth as number;
    const firstRowCells = tableContainerRef.current?.querySelectorAll(
      "#main-results thead tr:first-child th:not(.graph-cell)"
    );
    let totalCellWidth = 0;
    for (let i = 0; i < firstRowCells.length; i++) {
      totalCellWidth += firstRowCells[i].clientWidth;
    }
    const graphWidth = tableWidth - totalCellWidth;
    setGraphCellWidth(Math.max(graphWidth, 200));
    setTableCellScale(Math.max(Math.min(1, tableWidth / 1000), 0.85));
  }

  useEffect(() => {
    globalThis.window?.addEventListener("resize", onResize, false);
    return () =>
      globalThis.window?.removeEventListener("resize", onResize, false);
  }, []);
  useLayoutEffect(onResize, []);
  useEffect(onResize, [isTabActive]);

  const orderedVariations: ExperimentReportVariationWithIndex[] = useMemo(() => {
    const sorted = variations
      .map<ExperimentReportVariationWithIndex>((v, i) => ({ ...v, index: i }))
      .sort((a, b) => {
        if (a.index === baselineRow) return -1;
        return a.index - b.index;
      });
    // fix browser .sort() quirks. manually move the control row to top:
    const baselineIndex = sorted.findIndex((v) => v.index === baselineRow);
    if (baselineIndex > -1) {
      const baseline = sorted[baselineIndex];
      sorted.splice(baselineIndex, 1);
      sorted.unshift(baseline);
    }
    return sorted;
  }, [variations, baselineRow]);

  const showVariations = orderedVariations.map(
    (v) => !variationFilter?.includes(v.index)
  );
  const filteredVariations = orderedVariations.filter(
    (v) => !variationFilter?.includes(v.index)
  );
  const compactResults = filteredVariations.length <= 2;

  const domain = useDomain(filteredVariations, rows, differenceType);

  const rowsResults: (RowResults | "query error" | null)[][] = useMemo(() => {
    const rr: (RowResults | "query error" | null)[][] = [];
    rows.map((row, i) => {
      rr.push([]);
      const baseline = row.variations[baselineRow] || {
        value: 0,
        cr: 0,
        users: 0,
      };
      orderedVariations.map((v) => {
        let skipVariation = false;
        if (variationFilter?.length && variationFilter?.includes(v.index)) {
          skipVariation = true;
        }
        if (v.index === baselineRow) {
          skipVariation = true;
        }
        if (skipVariation) {
          rr[i].push(null);
          return;
        }
        if (
          queryStatusData?.status === "partially-succeeded" &&
          queryStatusData?.failedNames?.includes(row.metric.id)
        ) {
          rr[i].push("query error");
          return;
        }
        const stats = row.variations[v.index] || {
          value: 0,
          cr: 0,
          users: 0,
        };

        const denominator =
          !isFactMetric(row.metric) && row.metric.denominator
            ? (ssrPolyfills?.getExperimentMetricById?.(
                row.metric.denominator
              ) ||
                getExperimentMetricById(row.metric.denominator)) ??
              undefined
            : undefined;
        const rowResults = getRowResults({
          stats,
          baseline,
          metric: row.metric,
          denominator,
          metricDefaults,
          isGuardrail: row.resultGroup === "guardrail",
          minSampleSize: getMinSampleSizeForMetric(row.metric),
          statsEngine,
          differenceType,
          ciUpper,
          ciLower,
          pValueThreshold,
          snapshotDate: getValidDate(dateCreated),
          phaseStartDate: getValidDate(startDate),
          isLatestPhase,
          experimentStatus: status,
          displayCurrency,
          getFactTableById: ssrPolyfills?.getFactTableById || getFactTableById,
        });
        rr[i].push(rowResults);
      });
    });
    return rr;
  }, [
    rows,
    orderedVariations,
    baselineRow,
    variationFilter,
    metricDefaults,
    getMinSampleSizeForMetric,
    statsEngine,
    differenceType,
    ciUpper,
    ciLower,
    pValueThreshold,
    dateCreated,
    startDate,
    isLatestPhase,
    status,
    displayCurrency,
    queryStatusData,
    ssrPolyfills,
    getFactTableById,
    getExperimentMetricById,
  ]);

  // Sort rows by P-value if sorting is enabled
  const sortedRows = useMemo(() => {
    if (!pValueSortDirection || statsEngine === "bayesian") {
      return rows;
    }

    return [...rows].sort((a, b) => {
      // Get the first non-baseline variation for each row
      const aVariation = orderedVariations.find(v => v.index !== baselineRow && !variationFilter?.includes(v.index));
      const bVariation = orderedVariations.find(v => v.index !== baselineRow && !variationFilter?.includes(v.index));
      
      if (!aVariation || !bVariation) return 0;

      const aStats = a.variations[aVariation.index];
      const bStats = b.variations[bVariation.index];

      if (!aStats || !bStats) return 0;

      // Use adjusted P-value if available, otherwise use regular P-value
      const aPValue = aStats.pValueAdjusted !== undefined && pValueCorrection 
        ? aStats.pValueAdjusted 
        : aStats.pValue;
      const bPValue = bStats.pValueAdjusted !== undefined && pValueCorrection 
        ? bStats.pValueAdjusted 
        : bStats.pValue;

      // Handle undefined P-values
      if (aPValue === undefined && bPValue === undefined) return 0;
      if (aPValue === undefined) return 1;
      if (bPValue === undefined) return -1;

      const multiplier = pValueSortDirection === "asc" ? 1 : -1;
      return (aPValue - bPValue) * multiplier;
    });
  }, [rows, pValueSortDirection, statsEngine, orderedVariations, baselineRow, variationFilter, pValueCorrection]);

  // Create a mapping from original row indices to sorted row indices
  const rowIndexMapping = useMemo(() => {
    if (!pValueSortDirection || statsEngine === "bayesian") {
      return rows.map((_, i) => i);
    }
    
    const originalIndices = rows.map((_, i) => i);
    const sortedIndices = sortedRows.map(sortedRow => 
      rows.findIndex(originalRow => originalRow.metric.id === sortedRow.metric.id)
    );
    
    return sortedIndices;
  }, [rows, sortedRows, pValueSortDirection, statsEngine]);

  const {
    containerRef,
    tooltipOpen,
    tooltipData,
    hoveredX,
    hoveredY,
    hoverRow,
    leaveRow,
    closeTooltip,
    hoveredMetricRow,
    hoveredVariationRow,
    resetTimeout,
  } = useResultsTableTooltip({
    orderedVariations,
    rows,
    rowsResults,
    dimension,
    statsEngine,
    pValueCorrection,
    differenceType,
    noTooltip,
  });

  const noMetrics = rows.length === 0;

  const changeTitle = getEffectLabel(differenceType);

  const hasGoalMetrics = rows.some((r) => r.resultGroup === "goal");
  const appliedPValueCorrection = hasGoalMetrics
    ? pValueCorrection ?? null
    : null;

  const handlePValueSort = () => {
    setPValueSortDirection(prev => {
      if (prev === null) return "asc";
      if (prev === "asc") return "desc";
      return null;
    });
  };

  return (
    <div className="position-relative" ref={containerRef}>
      <CSSTransition
        key={`${hoveredMetricRow}-${hoveredVariationRow}`}
        in={
          tooltipOpen &&
          tooltipData &&
          hoveredX !== null &&
          hoveredY !== null &&
          hoveredMetricRow !== null &&
          hoveredVariationRow !== null
        }
        timeout={200}
        classNames="tooltip-animate"
        appear={true}
      >
        <ResultsTableTooltip
          left={hoveredX ?? 0}
          top={hoveredY ?? 0}
          data={tooltipData}
          tooltipOpen={tooltipOpen}
          close={closeTooltip}
          differenceType={differenceType}
          onPointerMove={resetTimeout}
          onClick={resetTimeout}
          onPointerLeave={leaveRow}
          isBandit={isBandit}
          ssrPolyfills={ssrPolyfills}
        />
      </CSSTransition>

      <div ref={tableContainerRef} className="experiment-results-wrapper">
        <div className="w-100" style={{ minWidth: 700 }}>
          <table id="main-results" className="experiment-results table-sm">
            <thead>
              <tr className="results-top-row">
                <th
                  className={clsx("axis-col header-label", { noStickyHeader })}
                  style={{
                    lineHeight: "15px",
                    width: 220 * tableCellScale,
                  }}
                >
                  <div className="row px-0">
                    {setMetricFilter ? (
                      <ResultsMetricFilter
                        metricTags={metricTags}
                        metricFilter={metricFilter}
                        setMetricFilter={setMetricFilter}
                        showMetricFilter={showMetricFilter}
                        setShowMetricFilter={setShowMetricFilter}
                      />
                    ) : (
                      <span className="pl-1" />
                    )}
                    <div
                      className="col-auto px-1"
                      style={{
                        wordBreak: "break-word",
                        overflowWrap: "anywhere",
                      }}
                    >
                      {labelHeader}
                    </div>
                    {editMetrics ? (
                      <div className="col d-flex align-items-end px-0">
                        <a
                          role="button"
                          className="ml-1 cursor-pointer"
                          onClick={(e) => {
                            e.preventDefault();
                            editMetrics();
                          }}
                        >
                          <GBEdit />
                        </a>
                      </div>
                    ) : null}
                  </div>
                </th>
                {!noMetrics ? (
                  <>
                    <th
                      style={{ width: 120 * tableCellScale }}
                      className={clsx("axis-col label", { noStickyHeader })}
                    >
                      <Tooltip
                        usePortal={true}
                        innerClassName={"text-left"}
                        body={
                          <div style={{ lineHeight: 1.5 }}>
                            The baseline that all variations are compared
                            against.
                            <div
                              className={`variation variation${baselineRow} with-variation-label d-flex mt-1 align-items-top`}
                              style={{ marginBottom: 2 }}
                            >
                              <span
                                className="label mr-1"
                                style={{ width: 16, height: 16, marginTop: 2 }}
                              >
                                {baselineRow}
                              </span>
                              <span className="font-weight-bold">
                                {variations[baselineRow].name}
                              </span>
                            </div>
                          </div>
                        }
                      >
                        Baseline <RxInfoCircled />
                      </Tooltip>
                    </th>
                    <th
                      style={{ width: 120 * tableCellScale }}
                      className={clsx("axis-col label", { noStickyHeader })}
                    >
                      <Tooltip
                        usePortal={true}
                        innerClassName={"text-left"}
                        body={
                          !compactResults ? (
                            ""
                          ) : (
                            <div style={{ lineHeight: 1.5 }}>
                              The variation being compared to the baseline.
                              <div
                                className={`variation variation${filteredVariations[1]?.index} with-variation-label d-flex mt-1 align-items-top`}
                                style={{ marginBottom: 2 }}
                              >
                                <span
                                  className="label mr-1"
                                  style={{
                                    width: 16,
                                    height: 16,
                                    marginTop: 2,
                                  }}
                                >
                                  {filteredVariations[1]?.index}
                                </span>
                                <span className="font-weight-bold">
                                  {filteredVariations[1]?.name}
                                </span>
                              </div>
                            </div>
                          )
                        }
                      >
                        Variation {compactResults ? <RxInfoCircled /> : null}
                      </Tooltip>
                    </th>
                    <th
                      style={{ width: 120 * tableCellScale }}
                      className={clsx("axis-col label", { noStickyHeader })}
                    >
                      {statsEngine === "bayesian" ? (
                        <div
                          style={{
                            lineHeight: "15px",
                            marginBottom: 2,
                          }}
                        >
                          <span className="nowrap">Chance</span>{" "}
                          <span className="nowrap">to Win</span>
                        </div>
                      ) : sequentialTestingEnabled ||
                        appliedPValueCorrection ? (
                        <Tooltip
                          usePortal={true}
                          innerClassName={"text-left"}
                          body={
                            <div style={{ lineHeight: 1.5 }}>
                              {getPValueTooltip(
                                !!sequentialTestingEnabled,
                                appliedPValueCorrection,
                                orgSettings.pValueThreshold ??
                                  DEFAULT_P_VALUE_THRESHOLD,
                                tableRowAxis
                              )}
                            </div>
                          }
                        >
                          <span 
                            className={clsx("cursor-pointer d-flex align-items-center", styles.sortableHeader, {
                              "sorted": pValueSortDirection !== null,
                              "up": pValueSortDirection === "asc"
                            })}
                            onClick={handlePValueSort}
                            style={{ userSelect: "none" }}
                          >
                            {appliedPValueCorrection ? "Adj. " : ""}P-value{" "}
                            <RxInfoCircled />
                          </span>
                        </Tooltip>
                      ) : (
                        <span 
                          className={clsx("cursor-pointer d-flex align-items-center", styles.sortableHeader, {
                            "sorted": pValueSortDirection !== null,
                            "up": pValueSortDirection === "asc"
                          })}
                          onClick={handlePValueSort}
                          style={{ userSelect: "none" }}
                        >
                          P-value
                        </span>
                      )}
                    </th>
                    <th
                      className={clsx("axis-col graph-cell", {
                        noStickyHeader,
                      })}
                      style={{
                        width:
                          (globalThis.window?.innerWidth ?? 900) < 900
                            ? graphCellWidth
                            : undefined,
                        minWidth:
                          (globalThis.window?.innerWidth ?? 900) >= 900
                            ? graphCellWidth
                            : undefined,
                      }}
                    >
                      <div className="position-relative">
                        <AlignedGraph
                          id={`${id}_axis`}
                          domain={domain}
                          significant={true}
                          showAxis={true}
                          axisOnly={true}
                          graphWidth={graphCellWidth}
                          percent={differenceType === "relative"}
                          height={45}
                        />
                      </div>
                    </th>
                    <th
                      style={{ width: 150 * tableCellScale }}
                      className={clsx("axis-col label text-right", {
                        noStickyHeader,
                      })}
                    >
                      <div style={{ lineHeight: "15px", marginBottom: 2 }}>
                        <Tooltip
                          usePortal={true}
                          innerClassName={"text-left"}
                          body={
                            <div style={{ lineHeight: 1.5 }}>
                              {getChangeTooltip(
                                changeTitle,
                                statsEngine || DEFAULT_STATS_ENGINE,
                                differenceType,
                                hasRisk,
                                !!sequentialTestingEnabled,
                                pValueCorrection ?? null,
                                pValueThreshold
                              )}
                            </div>
                          }
                        >
                          {changeTitle} <RxInfoCircled />
                        </Tooltip>
                      </div>
                    </th>
                  </>
                ) : (
                  <th
                    className={clsx("axis-col label", { noStickyHeader })}
                    colSpan={5}
                  />
                )}
              </tr>
            </thead>

            {sortedRows.map((row, i) => {
              const baseline = row.variations[baselineRow] || {
                value: 0,
                cr: 0,
                users: 0,
              };
              let alreadyShownQueryError = false;

              const timeSeriesButton = showTimeSeriesButton ? (
                <TimeSeriesButton
                  onClick={() => toggleVisibleTimeSeriesMetricId(row.metric.id)}
                  isActive={visibleTimeSeriesMetricIds.includes(row.metric.id)}
                />
              ) : null;

              return (
                <tbody className={clsx("results-group-row")} key={i}>
                  {!compactResults &&
                    drawEmptyRow({
                      className: "results-label-row",
                      label: renderLabelColumn(row.label, row.metric, row),
                      graphCellWidth,
                      rowHeight: METRIC_LABEL_ROW_HEIGHT,
                      id,
                      domain,
                      ssrPolyfills,
                      lastColumnContent:
                        !compactResults && timeSeriesButton !== null ? (
                          <Flex justify="end" mr="-1">
                            {timeSeriesButton}
                          </Flex>
                        ) : undefined,
                    })}

                  {orderedVariations.map((v, j) => {
                    const stats = row.variations[v.index] || {
                      value: 0,
                      cr: 0,
                      users: 0,
                    };
                    const originalRowIndex = rowIndexMapping[i];
                    const rowResults = rowsResults?.[originalRowIndex]?.[j];
                    if (!rowResults) {
                      return null;
                    }
                    if (rowResults === "query error") {
                      if (!alreadyShownQueryError) {
                        alreadyShownQueryError = true;
                        return drawEmptyRow({
                          key: j,
                          className:
                            "results-variation-row align-items-center error-row",
                          label: (
                            <>
                              {compactResults ? (
                                <div className="mb-1">
                                  {renderLabelColumn(
                                    row.label,
                                    row.metric,
                                    row
                                  )}
                                </div>
                              ) : null}
                              <div className="alert alert-danger px-2 py-1 mb-1 ml-1">
                                <FaExclamationTriangle className="mr-1" />
                                Query error
                              </div>
                            </>
                          ),
                          graphCellWidth,
                          rowHeight: compactResults
                            ? ROW_HEIGHT + 20
                            : ROW_HEIGHT,
                          id,
                          domain,
                          ssrPolyfills,
                        });
                      } else {
                        return null;
                      }
                    }

                    const hideScaledImpact =
                      !rowResults.hasScaledImpact &&
                      differenceType === "scaled";
                    const isHovered =
                      hoveredMetricRow === originalRowIndex && hoveredVariationRow === j;

                    const resultsHighlightClassname = clsx(
                      rowResults.resultsStatus,
                      {
                        "non-significant": !rowResults.significant,
                        hover: isHovered,
                      }
                    );

                    const onPointerMove = (
                      e,
                      settings?: TooltipHoverSettings
                    ) => {
                      // No hover tooltip if the screen is too narrow. Clicks still work.
                      if (
                        e?.type === "mousemove" &&
                        (globalThis.window?.innerWidth ?? 900) < 900
                      ) {
                        return;
                      }
                      if (!rowResults.hasData) return;
                      hoverRow(originalRowIndex, j, e, settings);
                    };
                    const onPointerLeave = () => {
                      if (!rowResults.hasData) return;
                      leaveRow();
                    };

                    return (
                      <tr
                        className="results-variation-row align-items-center"
                        key={j}
                      >
                        <td
                          className={`variation with-variation-label variation${v.index}`}
                          style={{
                            width: 220 * tableCellScale,
                          }}
                        >
                          {!compactResults ? (
                            <div className="d-flex align-items-center">
                              <span
                                className="label ml-1"
                                style={{ width: 20, height: 20 }}
                              >
                                {v.index}
                              </span>
                              <span
                                className="d-inline-block text-ellipsis"
                                title={v.name}
                                style={{
                                  width: 165 * tableCellScale,
                                }}
                              >
                                {v.name}
                              </span>
                            </div>
                          ) : (
                            renderLabelColumn(row.label, row.metric, row, 3)
                          )}
                        </td>
                        {j > 0 ? (
                          <MetricValueColumn
                            metric={row.metric}
                            stats={baseline}
                            users={baseline?.users || 0}
                            className={clsx("value baseline", {
                              hover: isHovered,
                            })}
                            showRatio={!isBandit}
                            displayCurrency={displayCurrency}
                            getExperimentMetricById={
                              ssrPolyfills?.getExperimentMetricById ||
                              getExperimentMetricById
                            }
                            getFactTableById={
                              ssrPolyfills?.getFactTableById || getFactTableById
                            }
                          />
                        ) : (
                          <td />
                        )}
                        <MetricValueColumn
                          metric={row.metric}
                          stats={stats}
                          users={stats?.users || 0}
                          className={clsx("value", {
                            hover: isHovered,
                          })}
                          showRatio={!isBandit}
                          displayCurrency={displayCurrency}
                          getExperimentMetricById={
                            ssrPolyfills?.getExperimentMetricById ||
                            getExperimentMetricById
                          }
                          getFactTableById={
                            ssrPolyfills?.getFactTableById || getFactTableById
                          }
                        />
                        {j > 0 ? (
                          statsEngine === "bayesian" ? (
                            <ChanceToWinColumn
                              stats={stats}
                              baseline={baseline}
                              rowResults={rowResults}
                              showRisk={true}
                              showSuspicious={true}
                              showPercentComplete={false}
                              showTimeRemaining={true}
                              showGuardrailWarning={
                                row.resultGroup === "guardrail"
                              }
                              hideScaledImpact={hideScaledImpact}
                              className={clsx(
                                "results-ctw",
                                resultsHighlightClassname
                              )}
                              onMouseMove={onPointerMove}
                              onMouseLeave={onPointerLeave}
                              onClick={onPointerMove}
                            />
                          ) : (
                            <PValueColumn
                              stats={stats}
                              baseline={baseline}
                              rowResults={rowResults}
                              pValueCorrection={
                                row.resultGroup === "goal"
                                  ? pValueCorrection
                                  : undefined
                              }
                              showRisk={true}
                              showSuspicious={true}
                              showPercentComplete={false}
                              showTimeRemaining={true}
                              showUnadjustedPValue={false}
                              showGuardrailWarning={
                                row.resultGroup === "guardrail"
                              }
                              hideScaledImpact={hideScaledImpact}
                              className={clsx(
                                "results-pval",
                                resultsHighlightClassname
                              )}
                              onMouseMove={onPointerMove}
                              onMouseLeave={onPointerLeave}
                              onClick={onPointerMove}
                            />
                          )
                        ) : (
                          <td></td>
                        )}
                        <td className="graph-cell">
                          {j > 0 ? (
                            <PercentGraph
                              barType={
                                statsEngine === "frequentist"
                                  ? "pill"
                                  : undefined
                              }
                              barFillType={
                                statsEngine === "frequentist"
                                  ? "significant"
                                  : "gradient"
                              }
                              disabled={hideScaledImpact}
                              significant={rowResults.significant}
                              baseline={baseline}
                              domain={domain}
                              metric={row.metric}
                              stats={stats}
                              id={`${id}_violin_row${i}_var${j}_${
                                row.resultGroup
                              }_${encodeURIComponent(dimension ?? "d-none")}`}
                              graphWidth={graphCellWidth}
                              height={
                                compactResults ? ROW_HEIGHT + 10 : ROW_HEIGHT
                              }
                              isHovered={isHovered}
                              percent={differenceType === "relative"}
                              className={clsx(
                                resultsHighlightClassname,
                                "overflow-hidden"
                              )}
                              rowStatus={
                                statsEngine === "frequentist"
                                  ? rowResults.resultsStatus
                                  : undefined
                              }
                              ssrPolyfills={ssrPolyfills}
                              onMouseMove={(e) =>
                                onPointerMove(e, {
                                  x: "element-center",
                                  targetClassName: "hover-target",
                                  offsetY: -8,
                                })
                              }
                              onMouseLeave={onPointerLeave}
                              onClick={(e) =>
                                onPointerMove(e, {
                                  x: "element-center",
                                  offsetY: -8,
                                })
                              }
                            />
                          ) : (
                            <AlignedGraph
                              id={`${id}_axis`}
                              domain={domain}
                              significant={true}
                              showAxis={false}
                              percent={differenceType === "relative"}
                              axisOnly={true}
                              graphWidth={graphCellWidth}
                              height={32}
                              ssrPolyfills={ssrPolyfills}
                            />
                          )}
                        </td>
                        {j > 0 ? (
                          <ChangeColumn
                            metric={row.metric}
                            stats={stats}
                            rowResults={rowResults}
                            differenceType={differenceType}
                            statsEngine={statsEngine}
                            className={resultsHighlightClassname}
                            ssrPolyfills={ssrPolyfills}
                            additionalButton={
                              compactResults ? timeSeriesButton : undefined
                            }
                          />
                        ) : (
                          <td></td>
                        )}
                      </tr>
                    );
                  })}

                  {visibleTimeSeriesMetricIds.includes(row.metric.id) ? (
                    <tr>
                      <td colSpan={6} style={{ padding: 0 }}>
                        <div className={styles.expandAnimation}>
                          <div className={styles.timeSeriesCell}>
                            <ExperimentMetricTimeSeriesGraphWrapper
                              experimentId={id}
                              experimentStatus={status}
                              metric={row.metric}
                              differenceType={differenceType}
                              variationNames={orderedVariations.map(
                                (v) => v.name
                              )}
                              showVariations={showVariations}
                              statsEngine={statsEngine}
                              pValueAdjustmentEnabled={
                                !!appliedPValueCorrection && rows.length > 1
                              }
                              firstDateToRender={getValidDate(startDate)}
                            />
                          </div>
                        </div>
                      </td>
                    </tr>
                  ) : null}
                </tbody>
              );
            })}
          </table>

          {noMetrics ? (
            <div className="metric-label py-2" style={{ marginLeft: 10 }}>
              <div className="metriclabel text-muted font-weight-bold">
                No metrics yet
              </div>
              <div className="small mt-1 mb-2">
                Add metrics to start tracking the performance of your
                experiment.
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function drawEmptyRow({
  key,
  className,
  style,
  label,
  graphCellWidth,
  rowHeight = SPACER_ROW_HEIGHT,
  id,
  domain,
  ssrPolyfills,
  lastColumnContent,
}: {
  key?: number | string;
  className?: string;
  style?: CSSProperties;
  label?: string | ReactElement;
  graphCellWidth: number;
  rowHeight?: number;
  id: string;
  domain: [number, number];
  ssrPolyfills?: SSRPolyfills;
  lastColumnContent?: ReactElement;
}) {
  return (
    <tr key={key} style={style} className={className}>
      <td colSpan={4}>
        <div style={{ marginTop: "var(--space-3)" }}>{label}</div>
      </td>
      <td className="graph-cell">
        <AlignedGraph
          id={`${id}_axis`}
          domain={domain}
          significant={true}
          showAxis={false}
          axisOnly={true}
          graphWidth={graphCellWidth}
          height={rowHeight}
          ssrPolyfills={ssrPolyfills}
        />
      </td>
      <td>{lastColumnContent}</td>
    </tr>
  );
}

function getChangeTooltip(
  changeTitle: string,
  statsEngine: StatsEngine,
  differenceType: DifferenceType,
  hasRisk: boolean,
  sequentialTestingEnabled: boolean,
  pValueCorrection: PValueCorrection,
  pValueThreshold: number
) {
  let changeText =
    "The uplift comparing the variation to the baseline, in percent change from the baseline value.";
  if (differenceType == "absolute") {
    changeText =
      "The absolute difference between the average values in the variation and the baseline. For non-ratio metrics, this is average difference between users in the variation and the baseline. Differences in proportion metrics are shown in percentage points (pp).";
  } else if (differenceType == "scaled") {
    changeText =
      "The total change in the metric per day if 100% of traffic were to have gone to the variation.";
  }

  const changeElem = (
    <>
      <p>
        <b>{changeTitle}</b> - {changeText}
      </p>
    </>
  );
  let intervalText = <></>;
  if (hasRisk && statsEngine === "bayesian") {
    intervalText = (
      <>
        The interval is a 95% credible interval. The true value is more likely
        to be in the thicker parts of the graph.
      </>
    );
  }
  if (statsEngine === "frequentist") {
    const confidencePct = percentFormatter.format(1 - pValueThreshold);
    intervalText = (
      <>
        The interval is a {confidencePct} confidence interval. If you re-ran the
        experiment 100 times, the true value would be in this range{" "}
        {confidencePct} of the time.
        {sequentialTestingEnabled && (
          <p className="mt-2 mb-0">
            Because sequential testing is enabled, these confidence intervals
            are valid no matter how many times you analyze (or peek at) this
            experiment as it runs.
          </p>
        )}
        {pValueCorrection && (
          <p className="mt-2 mb-0">
            Because your organization has multiple comparisons corrections
            enabled, these confidence intervals have been inflated so that they
            match the adjusted psuedo-p-value. Because confidence intervals do
            not generally exist for all adjusted p-values, we use a method that
            recreates the confidence intervals that would have produced these
            psuedo-p-values. For adjusted psuedo-p-values that are 1.0, the
            confidence intervals are infinite.
          </p>
        )}
      </>
    );
  }
  return (
    <>
      {changeElem}
      <p className="mt-3">
        <b>Graph</b> - {intervalText}
      </p>
    </>
  );
}

function getPValueTooltip(
  sequentialTestingEnabled: boolean,
  pValueCorrection: PValueCorrection,
  pValueThreshold: number,
  tableRowAxis: "dimension" | "metric"
) {
  return (
    <>
      {sequentialTestingEnabled && (
        <div className={pValueCorrection ? "mb-3" : ""}>
          Sequential testing is enabled. These are &apos;always valid
          p-values&apos; and robust to peeking. They have a slightly different
          interpretation to normal p-values and can often be 1.000. Nonetheless,
          the interpretation remains that the result is still statistically
          significant if it drops below your threshold ({pValueThreshold}).
        </div>
      )}
      {pValueCorrection && (
        <div>
          The p-values presented below are adjusted for multiple comparisons
          using the {pValueCorrection} method. P-values were adjusted across
          tests for
          {tableRowAxis === "dimension"
            ? " all dimension values, goal metrics, and variations"
            : " all goal metrics and variations"}
          . The unadjusted p-values are returned in the tooltip.
        </div>
      )}
    </>
  );
}
