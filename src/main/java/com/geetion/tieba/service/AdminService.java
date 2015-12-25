package com.geetion.tieba.service;


import com.geetion.tieba.pojo.Admin;

/**
 * Created by xiang on 2015/6/17.
 */
public interface AdminService {

    /**
     * 用户登录
     *
     * @param object
     * @return
     */
    public Admin login(Admin object);

    /**
     * 用户注册
     *
     * @param object
     * @return
     */
    public boolean register(Admin object);

    /**
     * 更新用户信息
     *
     * @param object
     * @return
     */
    public boolean updateAdmin(Admin object);

    /**
     * 通过注册的手机号码找到用户信息
     *
     * @return
     */
    public Admin getAdminByAccount(String account);

    /**
     * 根据主键ID获取用户信息
     *
     * @param id
     * @return
     */
    public Admin getAdminByPK(Long id);
}

