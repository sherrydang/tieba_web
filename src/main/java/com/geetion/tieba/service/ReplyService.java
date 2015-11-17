package com.geetion.tieba.service;

import com.geetion.tieba.pojo.Reply;
import com.geetion.tieba.utils.mybatis.PageEntity;
import com.geetion.tieba.utils.mybatis.PagingResult;

import java.util.List;

/**
 * Created by sherry on 2015/11/17.
 */
public interface ReplyService {
    /**
     * 新增一条回复
     */
    public boolean insert(Reply object);

    /**
     * 删除一条回复
     */
    public boolean delete(Long id);

    /**
     * 修改回复
     */
    public boolean updateById(Reply object);

    /**
     * 根据主键查找回复
     */
    public Reply selectById(Long id);

    /**
     * 根据用户id查找回复
     */
    public List<Reply> getReplyByClient(Long id);

    /**
     * 分页查询回复
     */
    public PagingResult<Reply> getReplyByParams(PageEntity pageEntity);

    /**
     * 批量删除回复
     */
    public int deleteBatch(List<Long> list);
}
