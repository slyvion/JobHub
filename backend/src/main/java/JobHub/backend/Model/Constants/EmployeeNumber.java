package JobHub.backend.Model.Constants;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

public enum EmployeeNumber {
    LESS_THAN_20("<20"),
    BETWEEN_21_AND_50("21-50"),
    BETWEEN_51_AND_100("51-100"),
    BETWEEN_101_AND_300("101-300"),
    BETWEEN_301_AND_500("301-500"),
    MORE_THAN_500("500+");

    private final String label;

    EmployeeNumber(String label) {
        this.label = label;
    }

    @JsonValue
    public String getLabel() {
        return label;
    }

    @JsonCreator // json -> enum
    public static EmployeeNumber fromLabel(String label) {
        for (EmployeeNumber count : values()) {
            if (count.label.equals(label)) {
                return count;
            }
        }
        throw new IllegalArgumentException("Invalid EmployeeCount: " + label);
    }
}

