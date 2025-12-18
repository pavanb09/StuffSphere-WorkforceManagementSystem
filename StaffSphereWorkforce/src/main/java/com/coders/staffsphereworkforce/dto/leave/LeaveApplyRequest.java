package com.coders.staffsphereworkforce.dto.leave;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;

public class LeaveApplyRequest {


    @NotBlank
    private String type; // SICK, CASUAL

    @NotNull
    private LocalDate startDate;

    @NotNull
    private LocalDate endDate;

    private String reason;

	public LeaveApplyRequest(@NotBlank String type, @NotNull LocalDate startDate,
			@NotNull LocalDate endDate, String reason) {
		super();
		this.type = type;
		this.startDate = startDate;
		this.endDate = endDate;
		this.reason = reason;
	}

	public LeaveApplyRequest() {
		super();
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public LocalDate getStartDate() {
		return startDate;
	}

	public void setStartDate(LocalDate startDate) {
		this.startDate = startDate;
	}

	public LocalDate getEndDate() {
		return endDate;
	}

	public void setEndDate(LocalDate endDate) {
		this.endDate = endDate;
	}

	public String getReason() {
		return reason;
	}

	public void setReason(String reason) {
		this.reason = reason;
	}

    // getters & setters
    
    
}
