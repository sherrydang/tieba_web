package com.geetion.drools.service;

/**
 * Created by virgilyan on 12/8/14.
 */
public interface MsgRuleService {
    /**
     * 检验验证码输入
     *
     * @param input
     * @param code
     * @return
     */
    public boolean validateCaptcha(String code, String input);
}
