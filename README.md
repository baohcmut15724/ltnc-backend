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
