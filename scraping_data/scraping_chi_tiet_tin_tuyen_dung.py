import mysql.connector
import json
# Kết nối đến database
db = mysql.connector.connect(
    host="localhost",
    user="root",  
    password="268388", 
    database="ITJOBS"
)
cursor = db.cursor()

# Lấy danh sách link chi tiết
cursor.execute("SELECT MA_TTD, LINK FROM TIN_TUYEN_DUNG")
links = cursor.fetchall()  # [(1, "https://topdev.vn/abc"), (2, "https://topdev.vn/xyz"), ...]

from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from bs4 import BeautifulSoup
import time

# Khởi tạo WebDriver
service = Service('chromedriver.exe')
driver = webdriver.Chrome(service=service)

# Hàm cào chi tiết tin tuyển dụng
def scrape_detail(link):
    driver.get(link)  # Mở link
    time.sleep(2)  # Chờ tải trang

    # Lấy nội dung HTML của trang
    html_content = driver.page_source
    soup = BeautifulSoup(html_content, 'html.parser')

    # Trích xuất dữ liệu chi tiết
    try:
        dc = soup.find("div", class_="my-2 max-w-[540px] text-base text-gray-500")
        if dc:
            div_elements = dc.find_all("div", class_='w-11/12')
            DIA_CHI_CU_THE = [div.text.strip() for div in div_elements]
        else: 
            DIA_CHI_CU_THE = "Không xác định"
        # print(DIA_CHI_CU_THE)    
        
        divs = soup.find_all("div", class_="prose max-w-full text-sm text-black lg:text-base")
        if divs:
            li_elements = divs[0].find_all("li")
            TRACH_NHIEM = [li.text.strip() for li in li_elements]
        else: 
            TRACH_NHIEM = "Không xác định"
        # print(TRACH_NHIEM) 
        
        ul = divs[1].find_all("ul")
        li_elements = ul[0].find_all("li") if len(ul) > 0 else []
        CHUYEN_MON = [li.text.strip() for li in li_elements]
        # Lấy nội dung của ul[1]
        if len(ul) > 1:  # Kiểm tra ul có ít nhất 2 phần tử hay không
            li_elements = ul[1].find_all("li")
            NICE_TO_HAVE = [li.text.strip() for li in li_elements]
        else:
            NICE_TO_HAVE = "Không xác định"

        # print("CHUYEN_MON:", CHUYEN_MON)
        # print("NICE_TO_HAVE:", NICE_TO_HAVE)

        # # PHUC_LOI
        div = soup.find("div", class_="pl-0")
        if div:
            div_elements = div.find("div", class_="prose max-w-full text-sm text-black lg:text-base")
            li_elements = div_elements.find_all("li")
            PHUC_LOI = [li.text.strip() for li in li_elements]
        else: 
            PHUC_LOI = "Không xác định"
        # print(PHUC_LOI) 
 
        pvs = soup.find_all('div', class_='item-card-info')
        QUI_TRINH_PV = "Không xác định"
        for div in pvs:
            header = div.find('h3')
            if header and header.text.strip() == "Quy trình phỏng vấn":
                ul = div.find('ul')
                QUI_TRINH_PV = [li.text.strip() for li in ul]             
        print(QUI_TRINH_PV)
        return {
            'DIA_CHI_CU_THE': DIA_CHI_CU_THE,
            'TRACH_NHIEM': TRACH_NHIEM,
            'CHUYEN_MON': CHUYEN_MON,
            'NICE_TO_HAVE': NICE_TO_HAVE,
            'PHUC_LOI': PHUC_LOI,
            'QUI_TRINH_PV': QUI_TRINH_PV
            
        }
    except Exception as e:
        print(f"Lỗi khi cào: {e}")
        return None

# Hàm lưu chi tiết vào database
def update_job_detail(ma_ttd, detail_data):
    # Chuyển đổi dữ liệu sang chuỗi JSON
    dia_chi_cu_the = json.dumps(detail_data['DIA_CHI_CU_THE'])
    trach_nhiem = json.dumps(detail_data['TRACH_NHIEM'])
    chuyen_mon = json.dumps(detail_data['CHUYEN_MON'])
    nice_to_have = json.dumps(detail_data['NICE_TO_HAVE'])
    phuc_loi = json.dumps(detail_data['PHUC_LOI'])
    qui_trinh_pv = json.dumps(detail_data['QUI_TRINH_PV'])
    
    cursor.execute("""
        UPDATE TIN_TUYEN_DUNG
        SET DIA_CHI_CU_THE = %s, TRACH_NHIEM = %s, CHUYEN_MON = %s, NICE_TO_HAVE = %s, PHUC_LOI = %s,QUI_TRINH_PV = %s
        WHERE MA_TTD = %s
    """, (dia_chi_cu_the, trach_nhiem, chuyen_mon, nice_to_have, phuc_loi,qui_trinh_pv, ma_ttd))
    db.commit()
for ma_ttd, link in links:
    print(f"Đang cào chi tiết tin tuyển dụng {ma_ttd}: {link}")
    detail = scrape_detail(link)
    if detail:
        update_job_detail(ma_ttd, detail)
        print(f"Đã lưu chi tiết tin tuyển dụng {ma_ttd}")
    else:
        print(f"Lỗi khi cào tin tuyển dụng {ma_ttd}")
