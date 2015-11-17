package com.geetion.tieba.service.impl;

import com.geetion.tieba.dao.ReplyDAO;
import com.geetion.tieba.pojo.Reply;
import com.geetion.tieba.service.ReplyService;
import com.geetion.tieba.utils.mybatis.PageEntity;
import com.geetion.tieba.utils.mybatis.PagingResult;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by sherry on 2015/11/17.
 */
@Service
public class ReplyServiceImpl implements ReplyService {

    @Resource
    private ReplyDAO replyDAO;

    @Override
    public boolean insert(Reply object) {
        try {
            replyDAO.insert(object);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    @Override
    public boolean delete(Long id) {
        return replyDAO.delete(id)>0;
    }

    @Override
    public boolean updateById(Reply object) {
        return replyDAO.update(object)>0;
    }

    @Override
    public Reply selectById(Long id) {
        return replyDAO.selectPk(id);
    }

    @Override
    public List<Reply> getReplyByClient(Long userId) {
        return replyDAO.selectByClient(userId);
    }

    @Override
    public PagingResult<Reply> getReplyByParams(PageEntity pageEntity) {
        PageHelper.startPage(pageEntity.getPage(), pageEntity.getSize());
        List<Reply> list = replyDAO.selectParam(pageEntity.getParams());
        PageInfo<Reply> pager = new PageInfo(list);
        return new PagingResult<>(pager.getPageNum(), pager.getTotal(), pager.getPages(), pager.getList());
    }

    @Override
    public int deleteBatch(List<Long> list) {
        return replyDAO.deleteBatch(list);
    }
}
