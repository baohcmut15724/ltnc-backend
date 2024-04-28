# API cuả driver

1. http://localhost:3000/user/register (post)
2. http://localhost:3000/user/login (post)
3. http://localhost:3000/user/ (get): get all users (admin ms goi dc)
4. http://localhost:3000/user/logout (get)
5. http://localhost:3000/user/switchStatus (post) (chuyển đổi trạng thái available và inactive)
6. http://localhost:3000/user/profile (get)
7. http://localhost:3000/user/profile (put) (update profile)
8. http://localhost:3000/user/history (get) (lịch sử các chuyến xe đã hoàn thành)
9. http://localhost:3000/user/cancelTrip/:id (get) (id của trip cần hủy)
10. http://localhost:3000/user/startTrip/:id (get) (id của trip cần bắt đầu)
11. http://localhost:3000/user/finishTrip/:id (get)
12. http://localhost:3000/user/getWaitingTrip (get) (chuyến xe được phân công)

# API của manager

## Car

1. http://localhost:3000/car (get) (danh sach cac xe)
2. http://localhost:3000/car (post) (them xe moi)
3. http://localhost:3000/:id (put) (id la id cua xe, cap nhat thong tin xe)
4. http://localhost:3000/:id (delete) (xoa xe);
5. http://localhost:3000/makeMaintenance/:id (post) (len lich bao duong xe)
6. http://localhost:3000/maintenance/:id (get) (đem xe đi bảo dưỡng)
7. http://localhost:3000/maintenanceDone/:id (post) (ket thuc bao duong, nhap chi phi)

## Trip

1. http://localhost:3000/trip (get) (cac chuyen dang di va duoc duoc len lich)
2. http://localhost:3000/trip/findDriver (post) (tim tai xe va xe cho chuyen di)
3. http://localhost:3000/trip (post) (tao chuyen di moi)
4. http://localhost:3000/trip/:id (delete) (huy chuyen di đã được lên lịch, nếu hủy các chuyến đi đang đi hoặc đã xong sẽ ném ra lỗi)
