package com.project.messenger.backend.model;

import java.io.Serializable;
import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

@Entity
@Table(name="messages")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Message implements Serializable{

	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="message_id")
	private int id;
	
	@NonNull
	@ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "chat_id", nullable = false)
	private Chat chat;
	
	@NonNull
	@ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
	private User user;
	
	@NonNull
	@Column(name="message")
	private String content;
	
	@Column(name="is_from")
	private boolean isFrom;
	
	@Column(name="is_reading")
	private boolean isReading;
	
	@NonNull
	@Column(name="date")
	private LocalDateTime Date;

}