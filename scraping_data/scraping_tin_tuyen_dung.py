from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.keys import Keys
from bs4 import BeautifulSoup
import time
import json
from selenium.webdriver.common.by import By
# 1. Khởi động Selenium WebDriver
# Tạo đối tượng Service để chỉ định đường dẫn tới ChromeDriver
service = Service('./chromedriver.exe')

# Khởi tạo WebDriver với service
driver = webdriver.Chrome(service=service)
driver.get("https://topdev.vn/viec-lam-it") 
driver.implicitly_wait(10)

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
import random
import hashlib

def generate_unique_phone_number():
    """Tạo số điện thoại ngẫu nhiên không trùng trong cơ sở dữ liệu."""
    while True:
        # Tạo số điện thoại ngẫu nhiên
        prefix = random.choice(["090", "091", "092", "093", "094", "095", "096", "097", "098", "099"])
        suffix = ''.join(random.choices("0123456789", k=7))
        phone_number = prefix + suffix

        # Kiểm tra xem số điện thoại đã tồn tại trong bảng USER chưa
        cursor.execute("SELECT COUNT(*) FROM USER WHERE SDT = %s", (phone_number,))
        if cursor.fetchone()[0] == 0:
            return phone_number

def hash_password(password):
    """Băm mật khẩu sử dụng SHA-256."""
    return hashlib.sha256(password.encode('utf-8')).hexdigest()

def insert_company(TEN_NTD, LOGO, DIA_CHI):
    # Kiểm tra và chèn nhà tuyển dụng
    cursor.execute("SELECT MA_NTD FROM NHA_TUYEN_DUNG WHERE TEN_NTD = %s", (TEN_NTD,))
    result = cursor.fetchone()
    if not result:
        # Tạo số điện thoại ngẫu nhiên không trùng
        while True:
            try:
                phone_number = generate_unique_phone_number()

                # Băm mật khẩu trước khi lưu
                hashed_password = hash_password(phone_number)

                # Thêm số điện thoại và các thông tin vào bảng USER
                cursor.execute("""
                    INSERT INTO USER (SDT, MK, IS_APPROVED, MA_ROLE) 
                    VALUES (%s, %s, %s, %s)
                """, (phone_number, hashed_password, True, 2))
                # db.commit()
                break  # Thêm thành công, thoát vòng lặp
            except Exception as e:
                # Nếu lỗi trùng lặp, tiếp tục tạo số khác
                if e.args[0] == 1062:  # Lỗi Duplicate entry
                    continue
                else:
                    raise e  # Các lỗi khác, báo lỗi

        # Thêm nhà tuyển dụng
        cursor.execute("""
            INSERT INTO NHA_TUYEN_DUNG (TEN_NTD, LOGO, DIA_CHI, SDT) 
            VALUES (%s, %s, %s, %s)
        """, (TEN_NTD, LOGO, DIA_CHI, phone_number))
        db.commit()
        return cursor.lastrowid
    return result[0]

def insert_skill(TEN_KN):
    # Kiểm tra và chèn kỹ năng
    cursor.execute("SELECT MA_KN FROM KI_NANG WHERE TEN_KN = %s", (TEN_KN,))
    result = cursor.fetchone()
    if not result:
        cursor.execute("INSERT INTO KI_NANG (TEN_KN) VALUES (%s)", (TEN_KN,))
        db.commit()
        return cursor.lastrowid
    return result[0]
def insert_level(TEN_CB):
    # Kiểm tra và chèn cấp bậc
    cursor.execute("SELECT MA_CB FROM CAP_BAC WHERE TEN_CB = %s", (TEN_CB,))
    result = cursor.fetchone()
    if not result:
        cursor.execute("INSERT INTO CAP_BAC (TEN_CB) VALUES (%s)", (TEN_CB,))
        db.commit()
        return cursor.lastrowid
    return result[0]
def insert_job(data):
    # Chèn tin tuyển dụng
    MA_NTD = insert_company(data['TEN_NTD'], data['LOGO'], data['DIA_CHI'])
    cursor.execute("""
        INSERT INTO TIN_TUYEN_DUNG (TEN_TTD, DIA_CHI, LINK, MA_NTD)
        VALUES (%s, %s, %s, %s)
    """, (data['TEN_TTD'], data['DIA_CHI'], data['LINK'], MA_NTD))
    db.commit()
    job_id = cursor.lastrowid

    # Chèn kỹ năng liên kết
    if (data['TEN_KN']!="Không xác định"):
        for skill in data['TEN_KN']:
            MA_KN = insert_skill(skill)
            cursor.execute("INSERT INTO TIN_TUYEN_DUNG_KI_NANG (MA_TTD, MA_KN) VALUES (%s, %s)", (job_id, MA_KN))
    # Chèn cấp bậc liên kết
    if (data['TEN_CB']!="Không xác định"):
        for level in data['TEN_CB']:
            MA_CB= insert_level(level)
            cursor.execute("INSERT INTO TIN_TUYEN_DUNG_CAP_BAC (MA_TTD, MA_CB) VALUES (%s, %s)", (job_id, MA_CB))
    
    db.commit()

jobs = soup.find_all('li', class_='mb-4 last:mb-0')  # Xác định class chính xác từ trang web
for job in jobs:
    try :
        print('--------------@@-------------------------')
        # TEN_TTD
        TEN_TTD = job.find('h3', class_='line-clamp-1').text.strip()
        print(TEN_TTD)
        # Link
        LINK = 'https://topdev.vn/'+ job.find('a')['href'][1:]  # Đường dẫn chi tiết công việc
        print (LINK)
        # LOGO
        LOGO = job.find('img')['src']
        print(LOGO)  
        # Company name
        company = job.find('a', class_='text-gray-600 transition-all hover:text-primary')  # Tên công ty
        TEN_NTD = company.text.strip() if company else "Không xác định"
        print(TEN_NTD)
        # Địa chỉ
        l = job.find('div', class_='flex flex-wrap items-end gap-2 text-gray-500')
        DIA_CHI = l.find('p').text.strip() if l else "Không xác định"
        print(DIA_CHI)
        # Keyworks
        k = job.find("div", class_="mt-4 flex items-center justify-between")
        if k:
            span_elements = k.find_all("span")
            TEN_KN = [span.text.strip() for span in span_elements]
        else: 
            TEN_KN = "Không xác định"
        print(TEN_KN)
        # Cấp bậc 
        cap_bac_div = job.find("div", class_="mt-2 flex items-center justify-start gap-5")
        if cap_bac_div:
            TEN_CB = cap_bac_div.find("p", class_='text-gray-500').text.strip().split(", ")
        else: 
            TEN_CB = "Không xác định"
        print(TEN_CB)
        
        # Lưu vào cơ sở dữ liệu
        data = {
            'TEN_TTD': TEN_TTD,
            'LINK': LINK,
            'LOGO': LOGO,
            'DIA_CHI': DIA_CHI,
            'TEN_NTD': TEN_NTD,
            'TEN_KN': TEN_KN,
            'TEN_CB': TEN_CB
        }
        insert_job(data)
        print(f"Lưu thành công: {TEN_TTD}")
    except Exception as e:
            print(f"Lỗi: {e}")
    