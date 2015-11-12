package com.geetion.tieba.utils;

import org.springframework.mail.MailSender;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.stereotype.Component;

@Component
public class Email {
	private MailSender mailSender;
	private SimpleMailMessage mailMessage;

	public Email() {
	}
	
	public void sendMail(String adressTo, String string) {
		
		SimpleMailMessage message = new SimpleMailMessage(mailMessage);// 设置email内容,
		message.setTo(adressTo);
		message.setText(string);
		
		mailSender.send(message);

	}

	public MailSender getMailSender() {
		return mailSender;
	}

	public void setMailSender(MailSender mailSender) {
		this.mailSender = mailSender;
	}

	public SimpleMailMessage getMailMessage() {
		return mailMessage;
	}

	public void setMailMessage(SimpleMailMessage mailMessage) {
		this.mailMessage = mailMessage;
	}
}
