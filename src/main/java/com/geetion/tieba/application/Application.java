package com.geetion.tieba.application;

import org.springframework.stereotype.Component;

/**
 * Created by mac on 15/2/28.
 */
@Component
public class Application {
//    public Map<String, Operate> operateMap;
//
//    public Map<String, Operate> operateNoMap;
//
//    @Resource
//    private AuthorityService authorityService;
//
//    public void initOperateMap() {
//        System.out.println("缓存operateMap");
//        List<Operate> list = authorityService.getAllOperates();
//        if (!list.isEmpty()) {
//            operateMap = new HashMap<>();
//            operateNoMap = new HashMap<>();
//            for (Operate operate : list) {
//                operateMap.put(operate.getUrl(), operate);
//                operateNoMap.put(operate.getOperate_no(), operate);
//            }
//        }
//    }
//
//
//    /**
//     * vist url as key
//     *
//     * @return
//     */
//    public Map<String, Operate> getURLMap() {
//        if (operateMap == null)
//            initOperateMap();
//        return operateMap;
//    }
//
//    /**
//     * opreateNo as key
//     *
//     * @return
//     */
//    public Map<String, Operate> getNoMap() {
//        if (operateNoMap == null)
//            initOperateMap();
//        return operateNoMap;
//    }
}
