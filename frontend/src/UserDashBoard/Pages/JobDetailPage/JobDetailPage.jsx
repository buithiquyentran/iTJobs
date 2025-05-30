import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import LocationOnIcon from '@mui/icons-material/LocationOn'; // Icon địa điểm
import AccessTimeIcon from '@mui/icons-material/AccessTime'; // Icon đồng hồ
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'; // Icon tiền
import BusinessIcon from '@mui/icons-material/Business';
import GroupsIcon from '@mui/icons-material/Groups';
import FlagIcon from '@mui/icons-material/Flag';
import Grid from '@mui/material/Grid2';
import {
    Box,
    Button,
    Typography,
    Tab,
    Tabs,
    Chip,
    Stack,
    Card,
    CardContent,
    Divider,
    Dialog,
    DialogContent,
    DialogTitle,
} from '@mui/material';
import './JobDetailPage.css';
import tinTuyenDungService from '~/UserDashBoard/services/tinTuyenDung.service';
import nhaTuyenDungService from '~/UserDashBoard/services/nhaTuyenDung.service';
import ApplyForm from '~/UserDashBoard/Components/ApplyForm';
import AuthService from '~/UserDashBoard/services/auth.service';
import ungTuyenService from '~/UserDashBoard/services/ungTuyen.service';

import JobSmall from '~/UserDashBoard/Components/Job/JobSmall';

const JobDetailPage = () => {
    const { id } = useParams();

    const [job, setJob] = useState();
    const [jobs, setJobs] = useState([]);
    const [suggestedJobs, setSuggestedJobs] = useState([]);

    const [company, setCompany] = useState();
    const [openDialog, setOpenDialog] = useState(false);
    const [user, setUser] = useState(null);
    const [infoToApply, setInfoToApply] = useState({});
    const [isApply, setIsApply] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await tinTuyenDungService.get(id);
                setJob(response);
                console.log(response);

                const response2 = await tinTuyenDungService.getAll();
                setJobs(response2.filter((item) => item.MA_NTD == response.MA_NTD));

                const response3 = await nhaTuyenDungService.get(response.MA_NTD);
                setCompany(response3);
                const response4 = await tinTuyenDungService.getSuggested(response.MA_TTD);
                setSuggestedJobs(response4);

                const userInfo = await AuthService.getUserInfo();
                setUser(userInfo);
                console.log(userInfo);
                setInfoToApply({
                    HO_TEN: userInfo?.TEN_NLD,
                    SDT: userInfo?.SDT,
                    EMAIL: userInfo?.EMAIL,
                    SDT_UNG_VIEN: userInfo?.SDT,
                    TEN_NTD: response3.TEN_NTD,
                    NTD_USERNAME: response3.SDT,
                    TEN_TTD: response.TEN_TTD,
                    MA_TTD: response.MA_TTD,
                });
                const ungtuyen = (await ungTuyenService.getByUsername(userInfo?.SDT)) || [];

                const applied = ungtuyen?.some((item) => item.MA_TTD == response.MA_TTD);

                setIsApply(applied);
                console.log(applied, response.MA_TTD);
            } catch (error) {
                console.error('Error fetching data ', error);
            }
        };
        fetchData();
    }, [id]);
    const [tabIndex, setTabIndex] = useState(0);
    const handleTabChange = (event, newValue) => {
        setTabIndex(newValue);
    };
    const handleOpenDialog = () => {
        if (user?.TEN_NLD) {
            setOpenDialog(true);
        } else {
            alert('Vui lòng đăng nhập để ứng tuyển');
            setOpenDialog(false);
            window.location.href = '/auth-page';
        }
    };
    const handleCreateCV = () => {
        if (user?.TEN_NLD) {
            window.location.href = '/user/view-cv?isEditting=true';
        } else {
            alert('Vui lòng đăng nhập để tạo CV');
            window.location.href = '/auth-page';
        }
    };

    return (
        <Box display="flex" flexDirection="row" padding={4} justifyContent="space-between">
            {/* Header */}
            <Box display="flex" flexDirection="column" justifyContent="fex-start" alignItems="center" width="69%">
                <Card
                    sx={{
                        width: '100%',
                        minHeight: '256px',
                        padding: 2,
                        marginTop: 0,
                    }}
                >
                    <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
                        <Box
                            component="img"
                            // src={job?.NhaTuyenDung.LOGO}
                            src={
                                job?.NhaTuyenDung.LOGO?.startsWith('/uploads/')
                                    ? `http://localhost:5000${job?.NhaTuyenDung.LOGO}`
                                    : job?.NhaTuyenDung.LOGO
                            }
                            alt="Company Logo"
                            sx={{ width: 180, borderRadius: 1, mr: 2, height: 'max-content' }}
                        />

                        <Typography variant="body1">
                            <Typography variant="h4" fontWeight="bold">
                                {job?.TEN_TTD}
                            </Typography>
                            {/* Job information */}
                            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                <Typography variant="8" color="error" fontWeight="bold">
                                    {job?.NhaTuyenDung.TEN_NTD}
                                </Typography>
                                <Box>
                                    {job?.DIA_CHI_CU_THE.map((dc) => (
                                        <Box
                                            sx={{ display: 'flex', justifyContent: 'flex-start' }}
                                            color="text.secondary"
                                        >
                                            <LocationOnIcon style={{ fontSize: 30, color: 'gray' }} />
                                            <Typography marginLeft={2}>{dc}</Typography>
                                        </Box>
                                    ))}
                                </Box>
                                <Box sx={{ display: 'flex', justifyContent: 'flex-start' }} color="text.secondary">
                                    {/* Icon đồng hồ */}
                                    <AccessTimeIcon style={{ fontSize: 30, color: 'gray' }} />
                                    <Typography marginLeft={2} lineHeight={2}>
                                        Đăng 3 ngày trước
                                    </Typography>
                                </Box>
                                <Box sx={{ display: 'flex', justifyContent: 'flex-start' }} color="text.secondary">
                                    {/* Icon tiền */}
                                    <AttachMoneyIcon style={{ fontSize: 30, color: 'gray' }} />
                                    <Typography marginLeft={2} lineHeight={2}>
                                        {/* Thương lượng */}
                                        {job?.MUC_LUONG}
                                    </Typography>
                                </Box>
                            </Box>
                        </Typography>
                    </Box>
                </Card>

                {/* Tabs for Job Description and About Company */}
                <Box
                    sx={{
                        marginTop: 1,
                        marginBottom: 3,
                        width: '100%',
                        backgroundColor: '#fff',
                    }}
                >
                    <Tabs value={tabIndex} onChange={handleTabChange}>
                        <Tab label="MÔ TẢ CÔNG VIỆC" />
                        <Tab sx={{ maxWidth: '100%' }} label={`VỀ CÔNG TY ${job?.NhaTuyenDung.TEN_NTD}`} />
                    </Tabs>
                    <Box hidden={tabIndex !== 0} padding={2}>
                        <Box>
                            <Typography variant="h6" fontWeight="bold">
                                Chuyên môn
                            </Typography>
                            <Typography variant="body2">
                                <ul className="list">
                                    {job?.CHUYEN_MON.map((cm) => (
                                        <li>{cm}</li>
                                    ))}
                                </ul>
                            </Typography>
                        </Box>
                        <Box>
                            <Typography variant="h6" fontWeight="bold">
                                Trách nhiệm
                            </Typography>
                            <Typography variant="body2">
                                <ul className="list">
                                    {job?.TRACH_NHIEM.map((cm) => (
                                        <li>{cm}</li>
                                    ))}
                                </ul>
                            </Typography>
                        </Box>
                        {job?.NICE_TO_HAVE != 'Không xác định' && (
                            <Box>
                                <Typography variant="h6" fontWeight="bold">
                                    Ưu tiên
                                </Typography>
                                <Typography variant="body2">
                                    <ul className="list">
                                        {job?.NICE_TO_HAVE?.map((cm) => (
                                            <li>{cm}</li>
                                        ))}
                                    </ul>
                                </Typography>
                            </Box>
                        )}
                        {job?.PHUC_LOI != 'Không xác định' ||
                            (job?.PHUC_LOI.length == 0 && (
                                <Box>
                                    <Typography variant="h6" fontWeight="bold">
                                        Phúc lợi
                                    </Typography>
                                    <Typography variant="body2">
                                        <ul className="list">
                                            {job?.PHUC_LOI.map((cm) => (
                                                <li>{cm}</li>
                                            ))}
                                        </ul>
                                    </Typography>
                                </Box>
                            ))}
                    </Box>
                    <Box hidden={tabIndex !== 1} padding={2}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography variant="h6" fontWeight="bold">
                                Thông tin về công ty {job?.NhaTuyenDung.TEN_NTD}
                            </Typography>
                            {/* Nút vị trí tuyển dụng */}
                            <Box mt={2} textAlign="right">
                                <Link to={id ? `/company/${job?.MA_NTD}` : '#'} className="company-detail">
                                    <Button variant="outlined" size="small">
                                        {`${jobs?.length} vị trí tuyển dụng`}
                                    </Button>
                                </Link>
                            </Box>
                        </Box>
                        {/* Dòng thông tin */}
                        <Grid container spacing={2} alignItems="center" justifyContent="space-between" marginTop={1}>
                            {/* Ngành nghề */}
                            <Grid item xs={12} sm={4} display="flex" alignItems="center">
                                <BusinessIcon sx={{ marginRight: 1, color: 'black' }} />
                                <Box>
                                    <Typography variant="body2" color="textSecondary">
                                        Ngành nghề
                                    </Typography>

                                    {/* <Typography variant="body1">{linhVuc?.join(', ')}</Typography> */}
                                </Box>
                            </Grid>

                            {/* Quy mô công ty */}
                            <Grid item xs={12} sm={4} display="flex" alignItems="center">
                                <GroupsIcon sx={{ marginRight: 1, color: 'black' }} />
                                <Box>
                                    <Typography variant="body2" color="textSecondary">
                                        Quy mô công ty
                                    </Typography>
                                    <Typography variant="body1">{company?.QUY_MO}</Typography>
                                </Box>
                            </Grid>

                            {/* Quốc tịch công ty */}
                            <Grid item xs={12} sm={4} display="flex" alignItems="center">
                                <FlagIcon sx={{ marginRight: 1, color: 'black' }} />
                                <Box>
                                    <Typography variant="body2" color="textSecondary">
                                        Quốc tịch công ty
                                    </Typography>
                                    <Typography variant="body1">{company?.QUOC_TICH}</Typography>
                                </Box>
                            </Grid>
                        </Grid>

                        <Typography
                            sx={{
                                display: '-webkit-box',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                WebkitLineClamp: 3, // Hiển thị tối đa 2 dòng
                                WebkitBoxOrient: 'vertical',
                            }}
                            variant="body1"
                            marginTop={1}
                        >
                            {company?.ABOUT?.map((ab) => (
                                <p>{ab}</p>
                            ))}
                        </Typography>

                        <Link to={id ? `/company/${company?.MA_NTD}` : '#'} className="company-detail">
                            Xem công ty
                        </Link>
                    </Box>
                </Box>
            </Box>
            <Box sx={{ width: '30%' }}>
                <Stack direction="column" spacing={2}>
                    <Button
                        variant="contained"
                        color="primary"
                        sx={{ lineHeight: '2.75' }}
                        onClick={handleOpenDialog}
                        disabled={isApply}
                    >
                        {isApply ? 'ĐÃ ỨNG TUYỂN' : 'ỨNG TUYỂN NGAY'}
                    </Button>

                    <Button
                        disabled={isApply}
                        variant="outlined"
                        sx={{ lineHeight: '2.75' }}
                        component={Link}
                        onClick={handleCreateCV}
                        // to={`/user/view-cv/?isEditting=true`}
                    >
                        TẠO CV ĐỂ ỨNG TUYỂN
                    </Button>
                </Stack>
                <Card
                    sx={{
                        padding: 2,
                        marginTop: 3,
                    }}
                >
                    <CardContent sx={{ padding: 0 }}>
                        <Typography variant="h6" fontWeight="bold">
                            Thông tin chung
                        </Typography>
                        <Divider sx={{ marginY: 2, width: '100%' }} orientation="hertical" flexItem />

                        <Typography sx={{ display: 'flex', alignItems: 'center' }} variant="h7" fontWeight="bold">
                            Năm kinh nghiệm: &nbsp;
                            <Typography variant="body2">From 3 years</Typography>
                        </Typography>

                        <Typography sx={{ display: 'flex', alignItems: 'center' }} variant="h7" fontWeight="bold">
                            Cấp bậc: &nbsp;
                            <Typography variant="body2">{job?.CapBacs.map((cb) => cb.TEN_CB).join(', ')}</Typography>
                        </Typography>
                        <Typography sx={{ display: 'flex', alignItems: 'center' }} variant="h7" fontWeight="bold">
                            Loại hình: &nbsp;
                            <Typography variant="body2">In Office</Typography>
                        </Typography>
                        <Typography sx={{ display: 'flex', alignItems: 'center' }} variant="h7" fontWeight="bold">
                            Loại hợp đồng: &nbsp;
                            <Typography variant="body2">Fulltime</Typography>
                        </Typography>

                        <Typography variant="h7" fontWeight="bold" marginTop={2}>
                            Kĩ năng:
                        </Typography>
                        <Box>
                            {job?.KiNangs.map((kn) => kn.TEN_KN).map((kn) => (
                                <Chip label={kn} color="primary" sx={{ marginRight: 1, marginBottom: '4px' }}></Chip>
                            ))}
                        </Box>

                        {job?.QUI_TRINH_PV && (
                            <Box>
                                <Typography variant="h6" fontWeight="bold" marginTop={2}>
                                    Qui trình phỏng vấn
                                </Typography>
                                <ul className="list">
                                    {job?.QUI_TRINH_PV?.map((pv) => (
                                        <li>{pv}</li>
                                    ))}
                                </ul>
                            </Box>
                        )}
                        {/* Việc làm phù hợp với bạn */}
                        <Card sx={{ marginTop: 2 }}>
                            <Typography
                                sx={{ padding: 1, backgroundColor: '#ccd6d5', display: 'block', width: '100%' }}
                                variant="h8"
                                fontWeight="bold"
                            >
                                Các công việc tương tự
                            </Typography>
                            <Divider orientation="horizontal" flexItem />
                            <Box sx={{ padding: 1, borderRadius: 2, paddingLeft: 0 }}>
                                {suggestedJobs?.map((job, index) => {
                                    if (index !== 0) {
                                        return (
                                            <>
                                                <Divider orientation="hertical" flexItem />
                                                <JobSmall job={job} applying={true} />
                                            </>
                                        );
                                    }
                                    return <JobSmall job={job} applying={true} />;
                                })}
                            </Box>
                        </Card>
                    </CardContent>
                </Card>
            </Box>

            <Dialog
                maxWidth={false} // bỏ giới hạn mặc định
                PaperProps={{
                    sx: {
                        // width: '1200px',
                        maxWidth: '800px',
                    },
                }}
                open={openDialog}
                onClose={() => setOpenDialog(false)}
            >
                <ApplyForm infoToApply={infoToApply} onCancle={() => setOpenDialog(false)} />
            </Dialog>
        </Box>
    );
};

export default JobDetailPage;
