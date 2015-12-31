<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%
    String previewUrl = request.getHeader("Referer");
    if(previewUrl!= null && previewUrl.indexOf("index.html") != -1){
        response.setStatus(402);
    }
%>
<!DOCTYPE HTML>
<html lang="zh-CN">
<head>
    <title>Login</title>
    <title>Ireddit</title>
    <!-- BOOTSTRAP STYLES-->
    <link rel="stylesheet" type="text/css" href="http://localhost:8080/css/bootstrap.css"/>
    <!-- FONTAWESOME STYLES-->
    <link rel="stylesheet" type="text/css" href="http://localhost:8080/css/font-awesome.css"/>
    <!-- CUSTOM STYLES-->
    <link rel="stylesheet" type="text/css" href="http://localhost:8080/css/login.css"/>

    <script type="text/javascript">
        function refreshImage() {
            document.getElementById("captchaImage").setAttribute("src",
                    "Kaptcha.jpg?" + Math.round(Math.random() * 10000));
        }
    </script>
</head>
<body>

<div class="container">
    <c:if test="${message!=null && message!='访问成功'}">
        <div id="message_box" class="alert alert-danger" role="alert" >${message}</div>
    </c:if>
    <div class="card signin-card">

        <form class="form-signin" method="post" action="" onsubmit="showMessage()">
            <h2 class="form-signin-heading">登录</h2>
            <input name="username" class="form-control" type="text" placeholder="输入账号" required autofocus>
            <input name="password" class="form-control" type="password" placeholder="密码" required>
            <div class="checkbox">
                <label>
                    <input type="checkbox" name="rememberMe" value="true"> 记住账号
                </label>
            </div>
            <button class="btn btn-lg btn-primary btn-block" type="submit">登录</button>
        </form>
        <script>
            function showMessage(){
                document.getElementById('message_box').hidden = false;
            }

        </script>
    </div>
</div>
</body>
</html>