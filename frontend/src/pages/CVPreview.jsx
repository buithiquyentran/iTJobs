import React from 'react';
import { Drawer, List, ListItem, ListItemText, Box, Typography, CssBaseline } from '@mui/material';

const CVPreview = ({ cv }) => {
    return (
        <Box
            sx={{
                p: 4,
                bgcolor: '#fff',
                color: '#000',
                height: '1123px',
                width: '794px',
                m: '0 auto',
                display: 'flex',
                fontSize: '13.5px',
            }}
        >
            <Box width={300} sx={{ marginRight: 1 }}>
                <img
                    width={300}
                    src="https://i.pinimg.com/236x/20/a3/42/20a34254756d573263d38bf7deea0deb.jpg"
                    alt="Ảnh CV"
                />
                <Box>
                    <h2>ABOUT ME</h2>
                    <p>
                        Là một người yêu thích công việc lập trình với tinh thần cầu tiến, ham học hỏi, không ngại khó
                        và chịu được áp lực công việc.
                        <br />
                        Em đang trong quá trình làm niên luận ngành, và cũng tìm kiếm cơ hội thực tập. <br />
                        Em chắc chắn sẽ cố gắng 100% công lực mang lại giá trị cho công ty mình nếu cho em cơ hội ạ.
                    </p>
                </Box>
                <Box>
                    <h2>CAREER GOAL </h2>
                    <p>
                        Là một người yêu thích công việc lập trình với tinh thần cầu tiến, ham học hỏi, không ngại khó
                        và chịu được áp lực công việc.
                    </p>
                    <p>Em đang trong quá trình làm niên luận ngành, và cũng tìm kiếm cơ hội thực tập.</p>
                    <p>Em chắc chắn sẽ cố gắng 100% công lực mang lại giá trị cho công ty mình nếu cho em cơ hội ạ.</p>
                </Box>
                <Box>
                    <h2>SKILLS</h2>
                    <p>
                        AI / Machine Learning/ Big Data React/Typescript <br />
                        React, JavaScript, Java, C#, MongoDB, MySQL
                    </p>
                </Box>
            </Box>
            <Box>
                {/* Thong tin lien he */}
                <Box sx={{ flexGrow: 1 }}>
                    <h2>Bùi Thị Quyền Trân - 2003</h2>
                    <h3>Fresher</h3>
                    <p>0899045266 - buithiquyentran29112003@gmail.com</p>
                    <p></p>Thành phố Cần Thơ
                    <p>https://github.com/buithiquyentran</p>
                </Box>
                {/* Kinh nghiệm */}
                <Box>
                    <h3>EXPERIENCE</h3>
                    <p>
                        Là một người yêu thích công việc lập trình với tinh thần cầu tiến, ham học hỏi, không ngại khó
                        và chịu được áp lực công việc.
                    </p>
                    <p>Em đang trong quá trình làm niên luận ngành, và cũng tìm kiếm cơ hội thực tập.</p>
                    <p>Em chắc chắn sẽ cố gắng 100% công lực mang lại giá trị cho công ty mình nếu cho em cơ hội ạ.</p>
                </Box>
                <Box>
                    <h3>PROJECT</h3>
                    <p>
                        Là một người yêu thích công việc lập trình với tinh thần cầu tiến, ham học hỏi, không ngại khó
                        và chịu được áp lực công việc.
                    </p>
                    <p>Em đang trong quá trình làm niên luận ngành, và cũng tìm kiếm cơ hội thực tập.</p>
                    <p>Em chắc chắn sẽ cố gắng 100% công lực mang lại giá trị cho công ty mình nếu cho em cơ hội ạ.</p>
                    <h3>CERTIFICATE</h3>
                    <p>
                        Là một người yêu thích công việc lập trình với tinh thần cầu tiến, ham học hỏi, không ngại khó
                        và chịu được áp lực công việc.
                    </p>
                    <p>Em đang trong quá trình làm niên luận ngành, và cũng tìm kiếm cơ hội thực tập.</p>
                    <p>Em chắc chắn sẽ cố gắng 100% công lực mang lại giá trị cho công ty mình nếu cho em cơ hội ạ.</p>
                </Box>

                <Box>
                    <h3>EDUCATION</h3>
                    <p>
                        Là một người yêu thích công việc lập trình với tinh thần cầu tiến, ham học hỏi, không ngại khó
                        và chịu được áp lực công việc.
                    </p>
                    <p>Em đang trong quá trình làm niên luận ngành, và cũng tìm kiếm cơ hội thực tập.</p>
                    <p>Em chắc chắn sẽ cố gắng 100% công lực mang lại giá trị cho công ty mình nếu cho em cơ hội ạ.</p>
                </Box>
            </Box>
        </Box>
    );
};

export default CVPreview;
