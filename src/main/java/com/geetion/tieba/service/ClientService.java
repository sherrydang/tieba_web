package com.geetion.tieba.service;


import com.geetion.tieba.pojo.Client;

/**
 * Created by xiang on 2015/6/17.
 */
public interface ClientService {

    /**
     * 用户登录
     *
     * @param object
     * @return
     */
    public Client login(Client object);

    /**
     * 用户注册
     *
     * @param object
     * @return
     */
    public boolean register(Client object);

    /**
     * 更新用户信息
     *
     * @param object
     * @return
     */
    public boolean updateClient(Client object);

    /**
     * 通过注册的手机号码找到用户信息
     *
     * @return
     */
    public Client getClientByAccount(String account);

    /**
     * 根据主键ID获取用户信息
     *
     * @param id
     * @return
     */
    public Client getClientByPK(Long id);
}

