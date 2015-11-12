<%@ page import="com.alibaba.fastjson.JSON" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE HTML>
<html lang="zh-CN">
<head>
    <title>登录</title>
    <link href="css/bootstrap.css" rel="stylesheet"/>
    <style>
        body {
            padding-bottom: 40px;
            background-color: #ffffff;
        }

        .form-signin {
            width: 500px;
            padding: 15px;
            margin-left: 8px;
            float: left;
        }

        .form-signin .form-control {
            position: relative;
            font-size: 16px;
            height: auto;
            width: 92%;
            padding: 8px;
            border: 1px solid #d3d3d3;
            margin-top: 12px;
            -webkit-border-radius: 4px;
        }

        .form-signin .form-control:focus {
            z-index: 2;
        }

        .login_button {
            border: 0 solid #000000;
            background-color: #85bd4e;
            padding: 20px;
            -webkit-border-radius: 5px;
            margin-top: 13px;
        }

        .title {
            color: #1e7dbd;
            margin-left: 24px
        }

        .input_left {
            float: left;
            width: 20%;
            height: 100%;
        }

        .input_right {
            float: left;
            width: 80%;
            height: 100%;
        }

    </style>
    <script type="text/javascript">
        function refreshImage() {
            document.getElementById("captchaImage").setAttribute("src",
                    "Kaptcha.jpg?" + Math.round(Math.random() * 10000));
        }
    </script>
</head>
<body>
<nav class="navbar navbar-default" role="navigation">
    <div class="navbar-header">
        <a class="navbar-brand" href="#">欢迎来到餐厨垃圾收运系统</a>
    </div>
</nav>

<div class="container">
    <c:if test="${message!=null && message!='访问成功'}">
        <div id="message_box" class="alert alert-danger" role="alert" >${message}</div>
    </c:if>
    <div class="col-lg-5">
        <img src="images/logo_login.png" height="289" width="398" style="margin-left:24px; margin-top: 8px;"/>
    </div>
    <div class="col-lg-7">
        <h4 class="title" style="margin-top: 60px">瀚蓝环境餐厨垃圾收运系统</h4>
        <h4 class="title">Grandblue Environment Of eat hutch garbage collect system</h4>

        <form class="form-signin" method="post" action="" onsubmit="showMessage()">
            <div class="input_right">
                <div>
                    <div class="input_left">
                        <h4 style="color: #727272;margin-top: 19px">用户名:</h4></div>
                    <div class="input_right">
                        <input name="username" class="form-control" type="text"
                               required
                               autofocus>
                    </div>
                </div>
                <div>
                    <div class="input_left">
                        <h4 style="color: #727272;margin-top: 19px">密&#12288;码:</h4>
                    </div>
                    <div class="input_right">
                        <input name="password" class="form-control" type="password" required>
                    </div>
                </div>
            </div>
            <div class="input_left">
                <button class="login_button" type="submit"><img src="images/btn_login.png" height="49" width="49"/>
                </button>
            </div>
        </form>
        <script>
            function showMessage(){
//                $('#message_box').show();
                document.getElementById('message_box').hidden = false;
            }

        </script>
    </div>
</div>
</body>
</html>