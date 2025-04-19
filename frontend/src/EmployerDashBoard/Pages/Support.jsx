import { Box, Typography, TextField, Button, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useState } from 'react';

const Support = () => {
    const [message, setMessage] = useState('');

    const faqs = [
        {
            question: 'Làm thế nào để thay đổi mật khẩu?',
            answer: 'Bạn có thể thay đổi mật khẩu trong phần "Cài đặt tài khoản".',
        },
        {
            question: 'Làm thế nào để tạo tin tuyển dụng?',
            answer: 'Vào mục "Quản lý tin tuyển dụng" và nhấn nút "Tạo mới".',
        },
        { question: 'Liên hệ hỗ trợ qua email như thế nào?', answer: 'Bạn có thể gửi email tới support@example.com.' },
    ];

    const handleSubmit = () => {
        alert(`Đã gửi yêu cầu: ${message}`);
        setMessage('');
    };

    return (
        <Box sx={{ flexGrow: 1, padding: '20px', marginLeft: '260px', marginTop: '64px' }}>
            <Typography variant="h4" gutterBottom>
                Hỗ trợ
            </Typography>

            {/* Phần nhập nội dung yêu cầu */}
            <TextField
                label="Nội dung yêu cầu"
                multiline
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                fullWidth
                margin="normal"
            />
            <Button onClick={handleSubmit} variant="contained">
                Gửi yêu cầu
            </Button>

            {/* Phần Câu hỏi thường gặp */}
            <Typography variant="h5" mt={4} mb={2}>
                Câu hỏi thường gặp
            </Typography>
            {faqs.map((faq, index) => (
                <Accordion key={index} sx={{ marginBottom: '8px' }}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography>{faq.question}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>{faq.answer}</Typography>
                    </AccordionDetails>
                </Accordion>
            ))}
        </Box>
    );
};

export default Support;
