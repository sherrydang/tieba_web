package com.geetion.tieba.aop;

import com.geetion.tieba.application.Application;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.ProceedingJoinPoint;
import org.springframework.beans.factory.annotation.Autowired;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

/**
 * Created by mac on 15/2/28.
 */
public class LoggerAOP {
    @Autowired(required = true)
    private HttpServletRequest request;

    @Resource
    private Application application;

    private final static String HOST_CTRL = "ctrl";
    private final static String HOST_PAD = "pad";
    private final static String HOST_VEHICLE = "vehicle";


    /**
     * 在核心业务执行前执行，不能阻止核心业务的调用。
     *
     * @param joinPoint
     */
    private void doBefore(JoinPoint joinPoint) {
        System.out.println("-----doBefore().invoke-----");
        System.out.println(" 此处意在执行核心业务逻辑前，做一些安全性的判断等等");
        System.out.println(" 可通过joinPoint来获取所需要的内容");
        System.out.println("-----End of doBefore()------");
    }

    /**
     * 手动控制调用核心业务逻辑，以及调用前和调用后的处理,
     * <p/>
     * 注意：当核心业务抛异常后，立即退出，转向After Advice
     * 执行完毕After Advice，再转到Throwing Advice
     *
     * @param pjp
     * @return
     * @throws Throwable
     */
    private Object doAround(ProceedingJoinPoint pjp) throws Throwable {
        System.out.println("-----doAround().invoke-----");
        System.out.println(" 此处可以做类似于Before Advice的事情");

        //调用核心逻辑
        Object retVal = pjp.proceed();

        System.out.println(" 此处可以做类似于After Advice的事情");
        System.out.println("-----End of doAround()------");
        return retVal;
    }

    /**
     * 核心业务逻辑退出后（包括正常执行结束和异常退出），执行此Advice
     *
     * @param joinPoint
     */
    private void doAfter(JoinPoint joinPoint) {
//        StringBuffer note = new StringBuffer();
//        String url = request.getRequestURI().replace("/web", "");
//        //function args
//        note.append("Class :" + joinPoint.getTarget() + "\nMethod :" + joinPoint.getSignature().getName());//这个是获得方法名
//        //currentUser visited
//        Subject currentUser = SecurityUtils.getSubject();
//        String employee_no = (String) currentUser.getPrincipal();
//        if (currentUser != null && employee_no != null) {
//            Operate operate = application.getURLMap().get(url);
//            //operate had define
//            String operateNote = null;
//            if (operate != null) {
//                String operateNo = operate.getOperate_no();
//                String parentNo = operateNo.substring(0, 3) + "00";
//                String baseNo = operateNo.substring(0, 2) + "000";
//                Operate parentOp = application.getNoMap().get(parentNo);
//                Operate baseOp = application.getNoMap().get(baseNo);
//                operateNote = baseOp.getName() + " -> " + parentOp.getName() + " -> " + operate.getName();
//            } else {
//                // user login
//                if (url.indexOf("login") != -1) {
//                    operateNote = "用户登录";
//                } else {
//                    operateNote = "未定义访问操作";
//                }
//            }
//            // save logRecord
//            OperateLogRecord operateLogRecord = new OperateLogRecord();
//            operateLogRecord.setEmployee_no(employee_no);
//            if (url.indexOf(HOST_CTRL) != -1)
//                operateLogRecord.setHost(HOST_CTRL);
//            else if (url.indexOf(HOST_PAD) != -1)
//                operateLogRecord.setHost(HOST_PAD);
//            else if (url.indexOf(HOST_VEHICLE) != -1)
//                operateLogRecord.setHost(HOST_VEHICLE);
//            operateLogRecord.setOperate_step(operateNote);
//            operateLogRecord.setNote(note.toString());
//            operateLogRecord.setOperate_url(url);
//            authorityService.LogOperate(operateLogRecord);
//        }
    }

    /**
     * 核心业务逻辑调用正常退出后，不管是否有返回值，正常退出后，均执行此Advice
     *
     * @param joinPoint
     */
    private void doReturn(JoinPoint joinPoint) {
    }

    /**
     * 核心业务逻辑调用异常退出后，执行此Advice，处理错误信息
     *
     * @param joinPoint
     * @param ex
     */
    private void doThrowing(JoinPoint joinPoint, Throwable ex) {
        System.out.println("-----doThrowing().invoke-----");
        System.out.println(" 错误信息：" + ex.getMessage());
        System.out.println(" 此处意在执行核心业务逻辑出错时，捕获异常，并可做一些日志记录操作等等");
        System.out.println(" 可通过joinPoint来获取所需要的内容");
        System.out.println("-----End of doThrowing()------");
    }

}
