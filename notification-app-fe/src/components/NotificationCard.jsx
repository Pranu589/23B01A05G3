import {
  Card,
  CardContent,
  Chip,
  Stack,
  Typography,
} from "@mui/material";

export function NotificationCard({ notification }) {
  return (
    <Card elevation={2}>
      <CardContent>
        <Stack spacing={1}>
          <Chip
            label={notification.Type}
            color={
              notification.Type === "Placement"
                ? "success"
                : notification.Type === "Result"
                ? "primary"
                : "warning"
            }
            sx={{ width: "fit-content" }}
          />

          <Typography variant="body1">
            {notification.Message}
          </Typography>

          <Typography variant="caption" color="text.secondary">
            {notification.Timestamp}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}