import requests
from bs4 import BeautifulSoup
import mysql.connector
# Kết nối MySQL
db = mysql.connector.connect(
    host="localhost",
    user="root",  # Thay bằng username MySQL của em
    password="268388",  # Thay bằng mật khẩu MySQL của em
    database="ITJOBS"
)
cursor = db.cursor()

# Hàm lưu dữ liệu vào MySQL
# def save_to_db(data):
#     sql = """
#     INSERT INTO jobs (title, company, location, img, salary,treatments, link)
#     VALUES (%s, %s, %s, %s, %s, %s, %s)
#     """
#     cursor.execute(sql, data)
#     db.commit()

# Cào dữ liệu từ TopDev
def scrape_topdev():
    # url = "https://topdev.vn/viec-lam-it"
    url_details = "https://topdev.vn/viec-lam/chuyen-vien-giai-phap-nen-tang-platform-solution-specialist-khoi-cong-nghe-thong-tin-ho24-329-mbbank-2035220?src=topdev_search&medium=searchresult"
    
    headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.5735.90 Safari/537.36'
    }
    # response = requests.get(url, headers=headers)u
    response = requests.get(url_details, headers=headers)
    
    soup = BeautifulSoup(response.text, 'html.parser')
    
    # tin tuyen dung
    try:
        dc = soup.find("div", class_="my-2 max-w-[540px] text-base text-gray-500")
        if dc:
            div_elements = dc.find_all("div", class_='w-11/12')
            DIA_CHI_CU_THE = [div.text.strip() for div in div_elements]
        else: 
            DIA_CHI_CU_THE = "Không xác định"
        print(DIA_CHI_CU_THE)    
        
        divs = soup.find_all("div", class_="prose max-w-full text-sm text-black lg:text-base")
        if divs:
            li_elements = divs[0].find_all("li")
            TRACH_NHIEM = [li.text.strip() for li in li_elements]
        else: 
            TRACH_NHIEM = "Không xác định"
        print(TRACH_NHIEM) 
        
        ul = divs[1].find_all("ul")
        li_elements = ul[0].find_all("li") if len(ul) > 0 else []
        CHUYEN_MON = [li.text.strip() for li in li_elements]
        # Lấy nội dung của ul[1]
        if len(ul) > 1:  # Kiểm tra ul có ít nhất 2 phần tử hay không
            li_elements = ul[1].find_all("li")
            NICE_TO_HAVE = [li.text.strip() for li in li_elements]
        else:
            NICE_TO_HAVE = "Không xác định"

        print("CHUYEN_MON:", CHUYEN_MON)
        print("NICE_TO_HAVE:", NICE_TO_HAVE)

        
        # PHUC_LOI
        div = soup.find("div", class_="pl-0")
        if div:
            div_elements = div.find("div", class_="prose max-w-full text-sm text-black lg:text-base")
            li_elements = div_elements.find_all("li")
            PHUC_LOI = [li.text.strip() for li in li_elements]
        else: 
            PHUC_LOI = "Không xác định"
        print(PHUC_LOI) 
        # QUI_TRINH_PV
        pvs = soup.find_all('div', class_='item-card-info')
        QUI_TRINH_PV = "Không xác định"
        for div in pvs:
            header = div.find('h3')
            if header and header.text.strip() == "Quy trình phỏng vấn":
                ul = div.find('ul')
                QUI_TRINH_PV = [li.text.strip() for li in ul]             
        print(QUI_TRINH_PV)
    except Exception as e:
        print(f"Lỗi khi cào: {e}")
        return None
    print("---------------@@-----------")
    # nha tuyen dụng
    # try:
    #     # LINH_VUC
    #     divs = soup.find_all('div')
    #     LINH_VUC = "Không xác định"
    #     for div in divs:
    #         header = div.find('h3') 
    #         if header and header.text.strip() == "Lĩnh vực": 
    #             p_tag = div.find('p', class_='mt-2') 
    #             if p_tag:  
    #                 content = p_tag.text.strip() 
    #                 if ", " in content:  
    #                     LINH_VUC = content.split(", ")  
    #                 else:
    #                     LINH_VUC = [content]  
    #                 break  # Ngừng lặp vì đã tìm thấy    
    #     # print(LINH_VUC)  
    #     # QUY_MO
    #     pvs = soup.find_all('div', class_='mt-4')
    #     QUY_MO = "Không xác định"
    #     for div in pvs:
    #         header = div.find('h3')
    #         if header and header.text.strip() == "Quy mô công ty":
    #             QUY_MO = div.find('p').text.strip() 
    #             break       
    #     # print(QUY_MO)
        
    #     # QUOC_TICH
    #     pvs = soup.find_all('div', class_='mt-4')
    #     QUOC_TICH = "Không xác định"
    #     for div in pvs:
    #         header = div.find('h3')
    #         if header and header.text.strip() == "Quốc tịch công ty":
    #             li_elements = div.find_all("li", class_='mt-1 first:mt-0')
    #             QUOC_TICH = [li.text.strip() for li in li_elements]     
    #             break
    #     # print(QUOC_TICH)
        
    #     # KI_NANG
    #     pvs = soup.find_all('div', class_='mt-4')
    #     KI_NANG = "Không xác định"
    #     for div in pvs:
    #         header = div.find('h3')
    #         if header and header.text.strip() == "Kỹ năng":
    #             li_elements = div.find_all("li")
    #             KI_NANG = [li.find('span').text.strip() for li in li_elements]     
    #             break
    #     # print(KI_NANG)
        
    #     # WEBSITE
    #     pvs = soup.find_all('div', class_='mt-4')
    #     WEBSITE = "Không xác định"
    #     for div in pvs:
    #         header = div.find('h3')
    #         if header and header.text.strip() == "Website":
    #             a = div.find("a", class_='mt-2 inline-block break-all text-blue-dark hover:underline')
    #             WEBSITE = a['href']
    #             break
    #     # print(WEBSITE)
        
    #     # DIA_CHI_CU_THE
    #     pvs = soup.find_all('div', class_='mt-4')
    #     DIA_CHI_CU_THE = "Không xác định"
    #     for div in pvs:
    #         header = div.find('h3')
    #         if header and header.text.strip() == "Địa chỉ công ty":
    #             li_elements = div.find_all("li")
    #             DIA_CHI_CU_THE = [li.find('p').text.strip() for li in li_elements]  
    #             break   
    #     # print(DIA_CHI_CU_THE)
    #     # DAI_NGO
    #     div = soup.find('div', class_='prose max-w-full text-sm text-black lg:text-base')
    #     ul = div.find_all('li')
    #     DAI_NGO = "Không xác định"
    #     if ul:
    #         DAI_NGO = [li.find('span').text.strip() for li in ul]   
    #     # print(DAI_NGO)
        
    
    #      # ABOUT
    #     div = soup.find('div', class_='prose max-w-full leading-snug text-gray-500')
    #     ABOUT = "Không xác định"
    #     ps = div.find_all('p')
    #     for p in ps:
    #         ABOUT = [p.find("span").text.strip() for p in ps]     
    #     print(ABOUT)
        
    # except Exception as e:
    #     print(f"Lỗi khi cào: {e}")
    #     return None
    # nha tuyen dung
    # companies = soup.find_all('div', class_='frame style-2')  # Xác định class chính xác từ trang web
    # for job in companies:
    #     try :
    #         print('--------------@@-------------------------')
    #         # TEN_NTD
    #         TEN_NTD = job.find('h6', class_='font-size20 tar mb-3 mr20').text.strip()
    #         # Kiểm tra và chèn nhà tuyển dụng
    #         cursor.execute("SELECT MA_NTD FROM NHA_TUYEN_DUNG WHERE TEN_NTD = %s", (TEN_NTD,))
    #         MA_NTD = cursor.fetchone()
    #         if not MA_NTD:
    #             continue
    #         print(TEN_NTD)
    #         # Link
    #         LINK = 'https://topdev.vn/'+ job.find('a')['href'][1:]  # Đường dẫn chi tiết công việc
    #         # print (LINK)
    #         # IMG
    #         logo = job.find('p', class_='big-img')
    #         IMG = logo.find('img')['data-src']
    #         print(IMG)  
    #         # LINH_VUC
    #         lv = job.find('p', class_='fz13 c--grey ml20')
    #         LINH_VUC = lv.text.strip().split(", ") if lv else []
    #         # print(LINH_VUC)
    #         # LOGAN
    #         logan = job.find('p', class_='fz13 ml20 mb-1 mw240')
    #         if logan:
    #             LOGAN = logan.text.strip()
    #         else:
    #             LOGAN = "Không xác định"
    #         # print(LOGAN)
    #         # Lưu vào cơ sở dữ liệu
    #         data = {
    #             'LINK': LINK,
    #             'IMG': IMG,
    #             'LINH_VUC': LINH_VUC,
    #             'LOGAN': LOGAN
    #         }
    #         # insert_company(data)
    #         print(f"Lưu thành công: {TEN_NTD}")
    #     except Exception as e:
    #             print(f"Lỗi: {e}")
   
    # Lọc các job trên trang
    # jobs = soup.find_all('li', class_='mb-4 last:mb-0')  # Xác định class chính xác từ trang web
    # for job in jobs:
    #     try:
            # title = job.find('h3', class_='line-clamp-1').text.strip()
            # img = job.find('img')['src']
            # print(img) 
            
            # company = job.find('a', class_='text-gray-600 transition-all hover:text-primary')  # Tên công ty
            # company_name = company.text.strip() if company else "Không xác định"
            # print(company_name)
            # l = soup.find('div', class_='flex flex-wrap items-end gap-2 text-gray-500')
            # location = l.find('p').text.strip()  if l else "Không xác định"
            # print(location)
            
            # d = job.find('div', class_="mt-2 flex items-center justify-start gap-5")
            # # print(div)
            # s = d.find_all("p") 
            # print (s)
            # # salary = s.text.strip() if s else "Không xác định"
            # # print(salary)
            
            # link = 'https://topdev.vn'+ job.find('a')['href'][3:]  # Đường dẫn chi tiết công việc
            # print (link)
            
            # ul = job.find('ul', class_='ml-6 list-disc text-gray-600')  # Tìm <ul> với id "items-list"
            # if (ul):
            #     p_elements = ul.find_all('p')  # Tìm tất cả <li> bên trong <ul>
            #     treatments = [p.text.strip()for p in p_elements]
            # else:
            #     treatments = "Không xác định"
            
            # print(treatments)
            
            # Keyworks
            # k = job.find("div", class_="mt-4 flex items-center justify-between")
            # if k:
            #     span_elements = k.find_all("span")
            #     keyworks = [span.text.strip() for span in span_elements]
            # else: 
            #     keyworks = "Không xác định"
            # print(keyworks)
             # Treatments
            # ul = job.find('ul', class_='ml-6 list-disc text-gray-600')  # Tìm <ul> với id "items-list"
            # if (ul):
            #     p_elements = ul.find_all('p')  # Tìm tất cả <li> bên trong <ul>
            #     treatments = [p.text.strip()for p in p_elements]
            # else:
            #     treatments = "Không xác định"
            # print(treatments)
            # Cấp bậc
            # cap_bac_div = job.find("div", class_="mt-2 flex items-center justify-start gap-5")
            # if cap_bac_div:
            #     cap_bac = cap_bac_div.find("p", class_='text-gray-500').text.strip().split(", ")
            # else: 
            #     cap_bac = "Không xác định"
            # print(cap_bac)
            
            # Tin tuyển dụng chi tiết
            
            # # Lưu vào cơ sở dữ liệu
            # save_to_db((title, company, location, img, salary,treatments, link))
            # print(f"Lưu thành công: {title}")
        # except Exception as e:
        #     print(f"Lỗi: {e}")

# Gọi hàm
scrape_topdev()

# Đóng kết nối
# cursor.close()
# db.close()
