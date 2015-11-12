package com.geetion.tieba.enums;

public enum ResultCode {
    // API操作状态提示语
    CODE_200(200, "访问成功"),
    CODE_401(401, "非法请求，参数错误"),
    CODE_402(402, "未授权，token过期或者无效"),
    CODE_403(403, "Method使用错误，请查看API"),
    CODE_404(404, "未找到访问地址"),
    CODE_500(500, "系统内部错误"),

    // 用户验证
    CODE_700(700, "用户不存在"),
    CODE_701(701, "密码错误"),
    CODE_702(702, "帐号被注册"),
    CODE_703(703, "服务器验证异常，请稍后重新登录"),

    //企业验证
    CODE_800(800, "企业不存在");

    public int code;
    public String msg;

    ResultCode(int code, String msg) {
        this.msg = msg;
        this.code = code;
    }
}
