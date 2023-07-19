// DB연결 상태 미들웨어 . 개발중
function authMiddleWare(connection) {
  return (req, res, next) => {
    console.log(connection);
    if (!connection) {
      console.log("fail");
      res.status(404).send();
      return;
    } else {
      console.log("success");
      next();
    }
  };
}

module.exports = { authMiddleWare };
