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
cursor.execute("SELECT MA_NTD, LINK FROM NHA_TUYEN_DUNG")
links = cursor.fetchall()

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
        # LINH_VUC
        divs = soup.find_all('div')
        LINH_VUC = "Không xác định"
        for div in divs:
            header = div.find('h3') 
            if header and header.text.strip() == "Lĩnh vực": 
                p_tag = div.find('p', class_='mt-2') 
                if p_tag:  
                    content = p_tag.text.strip() 
                    if ", " in content:  
                        LINH_VUC = content.split(", ")  
                    else:
                        LINH_VUC = [content]  
                    break    
        # print(LINH_VUC)  
        # QUY_MO
        pvs = soup.find_all('div', class_='mt-4')
        QUY_MO = "Không xác định"
        for div in pvs:
            header = div.find('h3')
            if header and header.text.strip() == "Quy mô công ty":
                QUY_MO = div.find('p').text.strip() 
                break       
        # print(QUY_MO)
        
        # QUOC_TICH
        pvs = soup.find_all('div', class_='mt-4')
        QUOC_TICH = "Không xác định"
        for div in pvs:
            header = div.find('h3')
            if header and header.text.strip() == "Quốc tịch công ty":
                li_elements = div.find("li", class_='mt-1 first:mt-0')
                QUOC_TICH = li_elements.text.strip() 
                break
        print(QUOC_TICH)
        
        # KI_NANG
        pvs = soup.find_all('div', class_='mt-4')
        KI_NANG = "Không xác định"
        for div in pvs:
            header = div.find('h3')
            if header and header.text.strip() == "Kỹ năng":
                li_elements = div.find_all("li")
                KI_NANG = [li.find('span').text.strip() for li in li_elements]     
                break
        # print(KI_NANG)
        
        # WEBSITE
        pvs = soup.find_all('div', class_='mt-4')
        WEBSITE = "Không xác định"
        for div in pvs:
            header = div.find('h3')
            if header and header.text.strip() == "Website":
                a = div.find("a", class_='mt-2 inline-block break-all text-blue-dark hover:underline')
                WEBSITE = a['href']
                break
        # print(WEBSITE)
        
        # DIA_CHI_CU_THE
        pvs = soup.find_all('div', class_='mt-4')
        DIA_CHI_CU_THE = "Không xác định"
        for div in pvs:
            header = div.find('h3')
            if header and header.text.strip() == "Địa chỉ công ty":
                li_elements = div.find_all("li")
                DIA_CHI_CU_THE = [li.find('p').text.strip() for li in li_elements]  
                break   
        # print(DIA_CHI_CU_THE)
        # DAI_NGO
        div = soup.find('div', class_='prose max-w-full text-sm text-black lg:text-base')
        ul = div.find_all('li')
        DAI_NGO = "Không xác định"
        if ul:
            DAI_NGO = [li.find('span').text.strip() for li in ul]   
        # print(DAI_NGO)
        
        # ABOUT
        div = soup.find('div', class_='prose max-w-full leading-snug text-gray-500')
        ABOUT = "Không xác định"
        ps = div.find_all('p')
        ABOUT = [p.find("span").text.strip() for p in ps]     
        return {
            'LINH_VUC': LINH_VUC,
            'QUY_MO': QUY_MO,
            'QUOC_TICH': QUOC_TICH,
            'KI_NANG': KI_NANG,
            'WEBSITE': WEBSITE,
            'DIA_CHI_CU_THE': DIA_CHI_CU_THE,
            'DAI_NGO': DAI_NGO,
            'ABOUT': ABOUT
        }
        
    except Exception as e:
        print(f"Lỗi khi cào: {e}")
        return None

def insert_skill(TEN_KN):
    # Kiểm tra và chèn kỹ năng
    cursor.execute("SELECT MA_KN FROM KI_NANG WHERE TEN_KN = %s", (TEN_KN,))
    result = cursor.fetchone()
    if not result:
        cursor.execute("INSERT INTO KI_NANG (TEN_KN) VALUES (%s)", (TEN_KN,))
        db.commit()
        return cursor.lastrowid
    return result[0]

def insert_field(TEN_LV):
    # Kiểm tra và chèn kỹ năng
    cursor.execute("SELECT MA_LV FROM LINH_VUC WHERE TEN_LV = %s", (TEN_LV,))
    result = cursor.fetchone()
    if not result:
        cursor.execute("INSERT INTO LINH_VUC (TEN_LV) VALUES (%s)", (TEN_LV,))
        db.commit()
        return cursor.lastrowid
    return result[0]

def update_company_detail(ma_ntd, data):
    # Chuyển đổi dữ liệu sang chuỗi JSON
    ABOUT = json.dumps(data['ABOUT'])
    DAI_NGO = json.dumps(data['DAI_NGO'])
    DIA_CHI_CU_THE = json.dumps(data['DIA_CHI_CU_THE'])
    cursor.execute("""
        UPDATE NHA_TUYEN_DUNG
        SET QUY_MO = %s, QUOC_TICH = %s, WEBSITE = %s, DIA_CHI_CU_THE = %s, ABOUT = %s,DAI_NGO = %s
        WHERE MA_NTD = %s
    """, (data['QUY_MO'], data['QUOC_TICH'], data['WEBSITE'], DIA_CHI_CU_THE, ABOUT, DAI_NGO, ma_ntd ))
    # Chèn kỹ năng liên kết
    if (data['KI_NANG']!="Không xác định"):
        for skill in data['KI_NANG']:
            MA_KN = insert_skill(skill)
            cursor.execute("INSERT INTO NHA_TUYEN_DUNG_KI_NANG (MA_NTD, MA_KN) VALUES (%s, %s)", (ma_ntd, MA_KN))
    if (data['LINH_VUC']!="Không xác định"):
        for field in data['LINH_VUC']:
            MA_LV = insert_field(field)
            cursor.execute("INSERT INTO NHA_TUYEN_DUNG_LINH_VUC (MA_NTD, MA_LV) VALUES (%s, %s)", (ma_ntd, MA_LV))
    db.commit()
for ma_ntd, link in links:
    print(f"Đang cào chi tiết nhà tuyển dụng {ma_ntd}: {link}")
    detail = scrape_detail(link)
    if detail:
        update_company_detail(ma_ntd, detail)
        print(f"Đã lưu chi tiết nhà tuyển dụng {ma_ntd}")
    else:
        print(f"Lỗi khi cào nhà tuyển dụng {ma_ntd}")
