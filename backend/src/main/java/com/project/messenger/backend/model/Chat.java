package com.project.messenger.backend.model;

import java.io.Serializable;

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
@Table(name = "chat")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Chat implements Serializable{

	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="chat_id")
	private int id;
	
	@NonNull
	@Column(name="charname")
	private String chatName;

	@Column(name="iconUrl")
	private String iconUrl;
	
	@NonNull
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name="userFirst_id",  nullable = false)
	private User userFirst;
	
	@NonNull
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name="userSecond_id",  nullable = false)
	private User userSecond;
	
}