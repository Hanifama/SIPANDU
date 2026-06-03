// src/pages/AttendanceDetail.tsx
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import {
  Box,
  Typography,
  Button,
  CircularProgress,
  Divider,
  Chip,
  Grid,
  Card,
  CardContent,
} from "@mui/material";
import {
  ArrowLeft,
  User,
  Calendar,
  Clock,
  Camera,
  MapPin,
  CheckCircle,
  XCircle,
  Clock as ClockIcon,
  MessageSquare,
} from "lucide-react";
import { useAttendanceStore } from "../../store/useAtendanceStore";
import DashboardLayout from "../layouts/Dashboard/DashboardLayout";

// Status color mapping
const statusColors = {
  present: {
    bg: "#ECFDF5",
    text: "#065F46",
    icon: <CheckCircle size={16} />,
  },
  absent: {
    bg: "#FEF2F2",
    text: "#991B1B",
    icon: <XCircle size={16} />,
  },
  late: {
    bg: "#FFFBEB",
    text: "#92400E",
    icon: <ClockIcon size={16} />,
  },
  default: {
    bg: "#F3F4F6",
    text: "#374151",
    icon: <ClockIcon size={16} />,
  },
};

const AttendanceDetail = () => {
  const { attendanceId } = useParams<{ attendanceId: string }>();
  const navigate = useNavigate();
  const { selectedAttendance, fetchAttendanceById, isLoading } =
    useAttendanceStore();

  useEffect(() => {
    if (attendanceId) {
      fetchAttendanceById(attendanceId);
    }
  }, [attendanceId, fetchAttendanceById]);

  const handleBack = () => navigate(-1);

  if (isLoading || !selectedAttendance) {
    return (
      <DashboardLayout>
        <Box className="flex justify-center items-center h-[60vh]">
          <CircularProgress />
        </Box>
      </DashboardLayout>
    );
  }

  const attendance = selectedAttendance;
  const statusConfig =
    statusColors[attendance.status as keyof typeof statusColors] ||
    statusColors.default;

  return (
    <DashboardLayout>
      <Box className="space-y-6 max-w-6xl mx-auto">
        {/* Header Section */}
        <Box className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <Box className="flex items-center gap-3">
            <Box>
              <Typography variant="h4" className="font-bold text-gray-900">
                Detail Absensi
              </Typography>
              <Typography variant="body1" className="text-gray-500 mt-1">
                {attendance.user?.name || "-"} •{" "}
              </Typography>
            </Box>
          </Box>

          <Chip
            icon={statusConfig.icon}
            label={
              attendance.status?.charAt(0).toUpperCase() +
                attendance.status?.slice(1) || "Unknown"
            }
            sx={{
              backgroundColor: statusConfig.bg,
              color: statusConfig.text,
              fontWeight: 600,
              padding: "8px 12px",
              height: "auto",
              "& .MuiChip-icon": {
                color: `${statusConfig.text} !important`,
              },
            }}
          />
        </Box>

        <Grid container spacing={3}>
          {/* User Information Card */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Card
              elevation={0}
              sx={{
                borderRadius: "16px",
                border: "1px solid",
                borderColor: "#E5E7EB",
                overflow: "hidden",
              }}
            >
              <CardContent className="p-6">
                <Box className="flex items-center gap-3 mb-4">
                  <Box
                    sx={{
                      backgroundColor: "#F3F4F6",
                      borderRadius: "50%",
                      padding: "10px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <User size={20} className="text-gray-600" />
                  </Box>
                  <Typography
                    variant="h6"
                    className="font-semibold text-gray-900"
                  >
                    Informasi User
                  </Typography>
                </Box>

                <Divider sx={{ marginBottom: "24px" }} />

                <Box className="space-y-4">
                  <InfoItem
                    icon={<User size={18} />}
                    label="Nama"
                    value={attendance.user?.name || "-"}
                  />
                  <InfoItem
                    icon={<span className="text-sm">#</span>}
                    label="User ID"
                    value={attendance.user_id}
                  />
                  <InfoItem
                    icon={<MapPin size={18} />}
                    label="Sumber"
                    value={attendance.source}
                  />
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Date & Time Card */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Card
              elevation={0}
              sx={{
                borderRadius: "16px",
                border: "1px solid",
                borderColor: "#E5E7EB",
                overflow: "hidden",
              }}
            >
              <CardContent className="p-6">
                <Box className="flex items-center gap-3 mb-4">
                  <Box
                    sx={{
                      backgroundColor: "#FFFBEB",
                      borderRadius: "50%",
                      padding: "10px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Calendar size={20} className="text-amber-600" />
                  </Box>
                  <Typography
                    variant="h6"
                    className="font-semibold text-gray-900"
                  >
                    Tanggal & Waktu
                  </Typography>
                </Box>

                <Divider sx={{ marginBottom: "24px" }} />

                <Box className="space-y-4">
                  <InfoItem
                    icon={<Calendar size={18} />}
                    label="Tanggal"
                    value={
                      attendance.check_in_time
                        ? new Date(attendance.check_in_time).toLocaleDateString(
                            "id-ID",
                            {
                              weekday: "long",
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }
                          )
                        : "-"
                    }
                  />
                  <InfoItem
                    icon={<Clock size={18} />}
                    label="Check In"
                    value={
                      attendance.check_in_time
                        ? new Date(attendance.check_in_time).toLocaleTimeString(
                            "id-ID",
                            {
                              hour: "2-digit",
                              minute: "2-digit",
                            }
                          )
                        : "-"
                    }
                  />
                  <InfoItem
                    icon={<Clock size={18} />}
                    label="Check Out"
                    value={
                      attendance.check_out_time
                        ? new Date(
                            attendance.check_out_time
                          ).toLocaleTimeString("id-ID", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })
                        : "-"
                    }
                  />
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Description Section */}
          {(attendance.check_in_description ||
            attendance.check_out_description) && (
            <Grid size={{ xs: 12 }}>
              <Card
                elevation={0}
                sx={{
                  borderRadius: "16px",
                  border: "1px solid",
                  borderColor: "#E5E7EB",
                  overflow: "hidden",
                }}
              >
                <CardContent className="p-6">
                  <Box className="flex items-center gap-3 mb-4">
                    <Box
                      sx={{
                        backgroundColor: "#EFF6FF",
                        borderRadius: "50%",
                        padding: "10px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <MessageSquare size={20} className="text-blue-600" />
                    </Box>
                    <Typography
                      variant="h6"
                      className="font-semibold text-gray-900"
                    >
                      Deskripsi
                    </Typography>
                  </Box>

                  <Divider sx={{ marginBottom: "24px" }} />

                  <Grid container spacing={3}>
                    {attendance.check_in_description && (
                      <Grid size={{ xs: 12, md: 6 }}>
                        <Box className="space-y-3">
                          <Typography
                            variant="subtitle2"
                            className="text-gray-700 font-medium flex items-center gap-2"
                          >
                            <MessageSquare size={16} />
                            Deskripsi Check In
                          </Typography>
                          <Box
                            sx={{
                              borderRadius: "12px",
                              padding: "16px",
                              backgroundColor: "#F9FAFB",
                              border: "1px solid #E5E7EB",
                            }}
                          >
                            <Typography
                              variant="body2"
                              className="text-gray-700"
                            >
                              {attendance.check_in_description}
                            </Typography>
                          </Box>
                        </Box>
                      </Grid>
                    )}

                    {attendance.check_out_description && (
                      <Grid size={{ xs: 12, md: 6 }}>
                        <Box className="space-y-3">
                          <Typography
                            variant="subtitle2"
                            className="text-gray-700 font-medium flex items-center gap-2"
                          >
                            <MessageSquare size={16} />
                            Deskripsi Check Out
                          </Typography>
                          <Box
                            sx={{
                              borderRadius: "12px",
                              padding: "16px",
                              backgroundColor: "#F9FAFB",
                              border: "1px solid #E5E7EB",
                            }}
                          >
                            <Typography
                              variant="body2"
                              className="text-gray-700"
                            >
                              {attendance.check_out_description}
                            </Typography>
                          </Box>
                        </Box>
                      </Grid>
                    )}
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          )}

          {/* Photo Evidence Section */}
          {(attendance.check_in_photo || attendance.check_out_photo) && (
            <Grid size={{ xs: 12 }}>
              <Card
                elevation={0}
                sx={{
                  borderRadius: "16px",
                  border: "1px solid",
                  borderColor: "#E5E7EB",
                  overflow: "hidden",
                }}
              >
                <CardContent className="p-6">
                  <Box className="flex items-center gap-3 mb-4">
                    <Box
                      sx={{
                        backgroundColor: "#ECFDF5",
                        borderRadius: "50%",
                        padding: "10px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Camera size={20} className="text-emerald-600" />
                    </Box>
                    <Typography
                      variant="h6"
                      className="font-semibold text-gray-900"
                    >
                      Bukti Foto
                    </Typography>
                  </Box>

                  <Divider sx={{ marginBottom: "24px" }} />

                  <Grid container spacing={3}>
                    {attendance.check_in_photo && (
                      <Grid size={{ xs: 12, md: 6 }}>
                        <Box className="space-y-3">
                          <Typography
                            variant="subtitle2"
                            className="text-gray-700 font-medium flex items-center gap-2"
                          >
                            <Camera size={16} />
                            Foto Check In
                          </Typography>
                          <Box
                            sx={{
                              borderRadius: "12px",
                              overflow: "hidden",
                              border: "1px solid",
                              borderColor: "#E5E7EB",
                              position: "relative",
                            }}
                          >
                            <img
                              src={attendance.check_in_photo}
                              alt="Check In"
                              className="w-full h-64 object-cover"
                            />
                            <Box
                              sx={{
                                position: "absolute",
                                bottom: 0,
                                left: 0,
                                right: 0,
                                background:
                                  "linear-gradient(transparent, rgba(0,0,0,0.7))",
                                padding: "12px",
                                color: "white",
                                fontSize: "0.875rem",
                              }}
                            >
                              {attendance.check_in_time &&
                                new Date(
                                  attendance.check_in_time
                                ).toLocaleTimeString("id-ID", {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}
                            </Box>
                          </Box>
                        </Box>
                      </Grid>
                    )}

                    {attendance.check_out_photo && (
                      <Grid size={{ xs: 12, md: 6 }}>
                        <Box className="space-y-3">
                          <Typography
                            variant="subtitle2"
                            className="text-gray-700 font-medium flex items-center gap-2"
                          >
                            <Camera size={16} />
                            Foto Check Out
                          </Typography>
                          <Box
                            sx={{
                              borderRadius: "12px",
                              overflow: "hidden",
                              border: "1px solid",
                              borderColor: "#E5E7EB",
                              position: "relative",
                            }}
                          >
                            <img
                              src={attendance.check_out_photo}
                              alt="Check Out"
                              className="w-full h-64 object-cover"
                            />
                            <Box
                              sx={{
                                position: "absolute",
                                bottom: 0,
                                left: 0,
                                right: 0,
                                background:
                                  "linear-gradient(transparent, rgba(0,0,0,0.7))",
                                padding: "12px",
                                color: "white",
                                fontSize: "0.875rem",
                              }}
                            >
                              {attendance.check_out_time &&
                                new Date(
                                  attendance.check_out_time
                                ).toLocaleTimeString("id-ID", {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}
                            </Box>
                          </Box>
                        </Box>
                      </Grid>
                    )}
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          )}
        </Grid>
        <Button
          startIcon={<ArrowLeft size={20} />}
          onClick={handleBack}
          variant="outlined"
          sx={{
            textTransform: "none",
            borderRadius: "12px",
            padding: "8px 16px",
            borderColor: "#E5E7EB",
            color: "#374151",
            "&:hover": {
              borderColor: "#D1D5DB",
              backgroundColor: "#F9FAFB",
            },
          }}
        >
          Kembali
        </Button>
      </Box>
    </DashboardLayout>
  );
};

const InfoItem = ({
  icon,
  label,
  value,
}: {
  icon?: React.ReactNode;
  label: string;
  value: any;
}) => (
  <Box className="flex items-start gap-3">
    <Box className="text-gray-500 mt-0.5">{icon}</Box>
    <Box>
      <Typography variant="body2" className="text-gray-500 mb-1">
        {label}
      </Typography>
      <Typography variant="body1" className="font-medium text-gray-900">
        {value}
      </Typography>
    </Box>
  </Box>
);

export default AttendanceDetail;
