export const htmlVerify = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Xác Nhận Email Thành Công</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 0;
        background-color: #f4f4f4;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
      }
      .container {
        max-width: 500px;
        background-color: #fff;
        padding: 40px;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        text-align: center;
      }
      .logo {
        width: 50px;
        height: auto;
        margin-bottom: 20px;
      }
      h1 {
        font-size: 28px;
        margin-bottom: 20px;
        color: #0366d6;
      }
      p {
        font-size: 18px;
        margin-bottom: 30px;
        color: #586069;
      }
      .button {
        display: inline-block;
        background-color: #0366d6;
        color: #fff;
        padding: 12px 24px;
        border-radius: 6px;
        font-size: 16px;
        text-decoration: none;
        transition: background-color 0.3s ease;
      }
      .button:hover {
        background-color: #0356a6;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <img
        src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
        alt="GitHub Logo"
        class="logo"
      />
      <h1>Xác Nhận Email Thành Công</h1>
      <p>Cảm ơn bạn đã xác nhận email thành công.</p>
      <a href="#" class="button">Quay lại trang chủ</a>
    </div>
  </body>
</html>
`;
