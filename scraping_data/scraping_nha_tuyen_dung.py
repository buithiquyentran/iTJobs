from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.keys import Keys
from bs4 import BeautifulSoup
import time
import json
from selenium.webdriver.common.by import By
# 1. Khởi động Selenium WebDriver
# Tạo đối tượng Service để chỉ định đường dẫn tới ChromeDriver
service = Service('chromedriver.exe')

# Khởi tạo WebDriver với service
driver = webdriver.Chrome(service=service)
driver.get("https://topdev.vn/nha-tuyen-dung?src=topdev.vn&medium=mainmenu") 
driver.implicitly_wait(5)

# 2. Mô phỏng cuộn trang để tải thêm dữ liệu
scroll_pause_time = 10
previous_height = driver.execute_script("return document.body.scrollHeight")

while True:
    # Cuộn xuống cuối trang
    driver.find_element('xpath', '//body').send_keys(Keys.END)
    time.sleep(scroll_pause_time)

    # Kiểm tra xem có dữ liệu mới không
    new_height = driver.execute_script("return document.body.scrollHeight")
    if new_height == previous_height:
        # Nếu không còn dữ liệu mới, dừng lại
        break
    previous_height = new_height

# 3. Lấy nội dung HTML sau khi cuộn xong
html_content = driver.page_source
driver.quit()  # Đóng trình duyệt

# 4. Phân tích HTML với BeautifulSoup
soup = BeautifulSoup(html_content, 'html.parser')

# 5. Cào dữ liệu
import mysql.connector
# Kết nối MySQL
db = mysql.connector.connect(
    host="localhost",
    user="root",  
    password="268388", 
    database="ITJOBS"
)
cursor = db.cursor()

def insert_company(data):
    # Kiểm tra và chèn nhà tuyển dụng
    cursor.execute("SELECT MA_NTD FROM NHA_TUYEN_DUNG WHERE TEN_NTD = %s", (data['TEN_NTD'],))
    result = cursor.fetchone()
    MA_NTD = result[0]
    cursor.execute("""
        UPDATE NHA_TUYEN_DUNG
        SET LINK = %s, IMG = %s, LOGAN = %s
        WHERE MA_NTD = %s
    """, (data['LINK'], data['IMG'], data['LOGAN'], MA_NTD))
    db.commit()
 # Kiểm tra và chèn nhà tuyển dụng
cursor.execute("SELECT TEN_NTD FROM NHA_TUYEN_DUNG")
result = cursor.fetchall()
TEN_NTD_list = [r[0] for r in result]
companies = soup.find_all('div', class_='frame style-2')  # Xác định class chính xác từ trang web
for job in companies:
    try :
        print('--------------@@-------------------------')
        # TEN_NTD
        TEN_NTD = job.find('h6', class_='font-size20 tar mb-3 mr20').text.strip()
        if TEN_NTD not in TEN_NTD_list:
            continue 
        print(TEN_NTD)
        # Link
        LINK = 'https://topdev.vn/'+ job.find('a')['href'][1:]  # Đường dẫn chi tiết công việc
        # print (LINK)
        # Lấy thẻ <p> chứa ảnh
        logo = job.find('p', class_='big-img')

        # Lấy thuộc tính 'data-src' hoặc 'src'
        if logo:
            img_tag = logo.find('img')
            if img_tag:
                IMG = img_tag.get('data-src')  # Thử lấy 'data-src'
                if IMG is None:  # Nếu 'data-src' không tồn tại, lấy 'src'
                    IMG = img_tag.get('src', "Không xác định")  # Trả về giá trị mặc định nếu cả 'src' không có
            else:
                IMG = "Không xác định"
        else:
            IMG = "Không xác định"

        print(IMG)
 
        # LOGAN
        logan = job.find('p', class_='fz13 ml20 mb-1 mw240')
        if logan:
            LOGAN = logan.text.strip()
        else:
            LOGAN = "Không xác định"
        print(LOGAN)
        # Lưu vào cơ sở dữ liệu
        data = {
            'TEN_NTD': TEN_NTD,
            'LINK': LINK,
            'IMG': IMG,
            'LOGAN': LOGAN
        }
        TEN_NTD_list.append(TEN_NTD)
        # print(TEN_NTD_list)
        insert_company(data)
        print(f"Lưu thành công: {TEN_NTD}")
    except Exception as e:
        print(f"Lỗi: {e}")
   