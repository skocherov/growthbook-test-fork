import { Flex, Tooltip } from "@radix-ui/themes";
import { ExperimentDataForStatusStringDates } from "back-end/types/experiment";
import { StatusIndicatorData } from "shared/enterprise";
import Badge from "@/components/Radix/Badge";
import { useExperimentStatusIndicator } from "@/hooks/useExperimentStatusIndicator";

type LabelFormat = "full" | "status-only" | "detail-only";

export default function ExperimentStatusIndicator({
  experimentData,
  labelFormat = "full",
  skipArchived = false,
}: {
  experimentData: ExperimentDataForStatusStringDates;
  labelFormat?: LabelFormat;
  skipArchived?: boolean;
}) {
  const getExperimentStatusIndicator = useExperimentStatusIndicator();
  const statusIndicatorData = getExperimentStatusIndicator(
    experimentData,
    skipArchived
  );

  return (
    <RawExperimentStatusIndicator
      statusIndicatorData={statusIndicatorData}
      labelFormat={labelFormat}
    />
  );
}

export function ExperimentDot({
  color,
}: {
  color: StatusIndicatorData["color"];
}) {
  return (
    <div
      style={{
        width: 8,
        height: 8,
        borderRadius: 8,
        backgroundColor: `var(--${color}-9)`,
      }}
    ></div>
  );
}

export function ExperimentStatusDetailsWithDot({
  statusIndicatorData,
}: {
  statusIndicatorData: StatusIndicatorData;
}) {
  const {
    color,
    status,
    detailedStatus,
    needsAttention,
    tooltip,
  } = statusIndicatorData;

  if (!detailedStatus) return null;

  const contents =
    needsAttention || status === "Stopped" ? (
      <Flex gap="1" align="center">
        <ExperimentDot color={color} />
        {detailedStatus}
      </Flex>
    ) : (
      <div>{detailedStatus}</div>
    );

  return tooltip ? <Tooltip content={tooltip}>{contents}</Tooltip> : contents;
}

export function RawExperimentStatusIndicator({
  statusIndicatorData,
  labelFormat = "full",
}: {
  statusIndicatorData: StatusIndicatorData;
  labelFormat?: LabelFormat;
}) {
  const { color, status, detailedStatus, tooltip } = statusIndicatorData;
  const label = getFormattedLabel(labelFormat, status, detailedStatus);

  const badge = (
    <Badge
      color={color}
      variant={"solid"}
      radius="full"
      label={label}
      style={{
        cursor: tooltip !== undefined ? "default" : undefined,
      }}
    />
  );

  return tooltip ? <Tooltip content={tooltip}>{badge}</Tooltip> : badge;
}

function getFormattedLabel(
  labelFormat: LabelFormat,
  status: string,
  detailedStatus?: string
): string {
  switch (labelFormat) {
    case "full":
      if (detailedStatus) {
        return `${status}: ${detailedStatus}`;
      } else {
        return status;
      }

    case "detail-only":
      if (detailedStatus) {
        return detailedStatus;
      } else {
        return status;
      }

    case "status-only":
      return status;

    default: {
      const _exhaustiveCheck: never = labelFormat;
      throw new Error(`Unknown label format: ${_exhaustiveCheck}`);
    }
  }
}
