import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Box,
    Typography,
    Card,
    CardMedia,
    CardContent,
    CardActions,
    Tab,
    Tabs,
    Button,
    Chip,
    Divider,
    Link,
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn'; // Icon địa điểm
import { useParams } from 'react-router-dom';
import Job from '~/UserDashBoard/Components/Job/Job';
import nhaTuyenDungService from '~/UserDashBoard/services/nhaTuyenDung.service';
import tinTuyenDungService from '~/UserDashBoard/services/tinTuyenDung.service';

const CompanyDetails = () => {
    const { id } = useParams();
    // console.log('id ', id);
    const [company, setCompany] = useState(null);
    // const [linhVuc, setLinhVuc] = useState([]);
    // const [kiNang, setKiNang] = useState([]);
    const [jobs, setJobs] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await nhaTuyenDungService.get(id);
                setCompany(response);
                const jobs = await tinTuyenDungService.getAll();
                // console.log(jobs);
                const filterjobs = jobs.filter((job) => job.MA_NTD == id);
                setJobs(filterjobs);
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
    return (
        <Box
            sx={{
                padding: 2,
                width: '100%',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
            }}
        >
            {/* Left Column */}
            <Box sx={{ width: '64%', marginRight: 1, paddingTop: 2 }}>
                <CardMedia
                    sx={{
                        height: 400,
                        width: '100%',
                        backgroundImage: company?.IMG
                            ? `url(${company.IMG})`
                            : 'url("https://salt.topdev.vn/MR1Y_GUMkKRo91V8JpXGjJq1ZkY8rIhxfxBdl5g1nN4/auto/310/250/ce/1/aHR0cHM6Ly90b3BkZXYudm4vYXNzZXRzL2Rlc2t0b3AvaW1hZ2VzL2NvbXBhbnktc2NlbmUtMy5wbmc/company-scene-3.jpg")',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        borderRadius: '8px',
                    }}
                />
                <Box sx={{ padding: 2, display: 'flex' }}>
                    <Card
                        sx={{
                            width: '100%',
                            marginTop: '-15%',
                            padding: 2,
                            boxShadow: 3,
                            borderRadius: '8px',
                        }}
                    >
                        <Box sx={{ display: 'flex' }}>
                            {/* Logo */}
                            {company?.LOGO ? (
                                <CardMedia
                                    component="img"
                                    src={company.LOGO}
                                    alt="Company Logo"
                                    sx={{
                                        width: 180,
                                        borderRadius: 1,
                                        mr: 4,
                                        height: 'max-content',
                                    }}
                                />
                            ) : (
                                <Typography variant="body2" color="text.secondary">
                                    Không có logo
                                </Typography>
                            )}

                            {/* Company Info */}
                            <Box sx={{ flexGrow: 1 }}>
                                <Box>
                                    <Typography variant="h4" fontWeight="bold">
                                        {/* DaouKiwoom Innovation */}
                                        {company?.TEN_NTD}
                                    </Typography>
                                    <Typography variant="h7" color="textSecondary">
                                        {/* ICT and Finance Platform Leader */}
                                        {company?.LOGAN}
                                    </Typography>
                                    <Box>
                                        <Link href="#">{jobs?.length} vị trí tuyển dụng</Link>
                                    </Box>
                                </Box>
                                {/* Actions */}
                                <Box sx={{ marginTop: 1 }}>
                                    <Button variant="contained" sx={{ marginRight: 1, width: '70%' }}>
                                        Theo dõi
                                    </Button>
                                    <Button variant="outlined" sx={{ width: '20%' }}>
                                        Chia sẻ
                                    </Button>
                                </Box>
                            </Box>
                        </Box>
                    </Card>
                </Box>

                <Box
                    sx={{
                        marginTop: 1,
                        marginBottom: 3,
                        width: '100%',
                        backgroundColor: '#fff',
                    }}
                >
                    <Tabs value={tabIndex} onChange={handleTabChange}>
                        <Tab label="THÔNG TIN CÔNG TY" />
                        <Tab label={`${jobs?.length} VỊ TRÍ TUYỂN DỤNG `} />
                    </Tabs>
                    <Box hidden={tabIndex !== 0} padding={2}>
                        <Box>
                            <Typography variant="body2">
                                {company?.ABOUT?.map((about) => (
                                    <>
                                        {' '}
                                        {about} <br />{' '}
                                    </>
                                ))}
                            </Typography>
                        </Box>
                        {company?.DAI_NGO !== 'Không xác định' && (
                            <Box>
                                <Typography variant="h6" fontWeight="bold">
                                    Đãi ngộ
                                </Typography>
                                <Typography variant="body2">
                                    <ul className="list">
                                        {company?.DAI_NGO?.map((daiNgo) => (
                                            <li> {daiNgo} </li>
                                        ))}
                                    </ul>
                                </Typography>
                            </Box>
                        )}
                    </Box>

                    <Box hidden={tabIndex !== 1} padding={2}>
                        <Box>
                            {/* Nút vị trí tuyển dụng */}
                            {jobs?.length > 0 ? (
                                <Box mt={2} textAlign="right">
                                    {/* Jobs */}
                                    <Box>
                                        {jobs?.map((job) => (
                                            <Box sx={{ marginY: 1 }} key={job.id}>
                                                <Job job={job} />
                                            </Box>
                                        ))}
                                    </Box>
                                </Box>
                            ) : (
                                <Typography variant="body2">Không có vị trí tuyển dụng nào</Typography>
                            )}
                        </Box>
                    </Box>
                </Box>
            </Box>
            {/* Right Column */}
            <Box sx={{ width: '30%', marginTop: 2, flexGrow: 1 }}>
                <Box item xs={12} md={4}>
                    {/* General Info */}
                    <Card sx={{ padding: 2, marginBottom: 2 }}>
                        <Typography variant="h6" fontWeight="bold">
                            Thông tin chung
                        </Typography>
                        <Divider sx={{ marginY: 1 }} />
                        {company?.LinhVucs?.length > 0 && (
                            <Typography variant="body2">
                                <strong>Lĩnh vực: &nbsp;</strong>
                                {company?.LinhVucs?.map((item) => item.TEN_LV).join(', ')}
                            </Typography>
                        )}

                        <Typography variant="body2">
                            <strong>Quy mô công ty: &nbsp;</strong> {company?.QUY_MO}
                        </Typography>
                        <Typography variant="body2">
                            <strong>Quốc tịch công ty: &nbsp;</strong> {company?.QUOC_TICH}
                        </Typography>
                        <Typography variant="body2" sx={{ marginTop: 1 }}>
                            <strong>Kỹ năng: &nbsp;</strong>
                        </Typography>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, marginTop: 1 }}>
                            {company?.KiNangs?.length > 0 &&
                                company?.KiNangs?.map((skill) => (
                                    <Chip key={skill.TEN_KN} label={skill.TEN_KN} color="primary" />
                                ))}
                        </Box>
                    </Card>

                    {/* Contact Info */}
                    <Card sx={{ padding: 2 }}>
                        <Typography variant="h6" fontWeight="bold">
                            Thông tin liên hệ
                        </Typography>
                        <Divider sx={{ marginY: 1 }} />
                        <Typography variant="body2">
                            <strong>Website:</strong>{' '}
                            <Link href="https://daoukiwoom.vn" target="_blank">
                                {company?.WEBSITE}
                            </Link>
                        </Typography>
                        <Typography variant="body2" sx={{ marginTop: 1 }}>
                            <Typography variant="h6" fontWeight="bold">
                                Địa chỉ công ty:
                            </Typography>
                            <Box>
                                <Typography variant="body2">
                                    {company?.DIA_CHI_CU_THE?.map((dc) => (
                                        <Box sx={{ display: 'flex' }}>
                                            <LocationOnIcon
                                                style={{
                                                    fontSize: 30,
                                                    color: 'gray',
                                                    alignSelf: 'center',
                                                    marginRight: '8px',
                                                }}
                                            />
                                            {dc} <br />{' '}
                                        </Box>
                                    ))}
                                </Typography>
                            </Box>
                        </Typography>
                    </Card>
                </Box>
            </Box>
        </Box>
    );
};

export default CompanyDetails;
