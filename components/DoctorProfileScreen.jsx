import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Modal,
} from "react-native";
import {
  Ionicons,
  FontAwesome,
  Feather,
  FontAwesome6,
  MaterialIcons,
} from "@expo/vector-icons";

const DoctorProfileScreen = ({ navigation }) => {
  // States
  const [showTimeSelection, setShowTimeSelection] = useState(false);
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);
  const [selectedTime, setSelectedTime] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

  // Updated mock data
  const doctor = {
    id: 1,
    name: "Dr. R.David",
    specialty: "Senior Cardiologist and Surgeon",
    experience: "7 year",
    patients: "1000+",
    rating: 4.8,
    about:
      "Dr. R.David is the best heart cardiology specialist in Coimbatore Hospital. He has a UK degree. He provided several patients for non-invasive treatments with great results.",
    availableDays: [
      {
        day: "Mon",
        date: "20",
        month: "Nov",
        times: ["9:00", "10:00", "11:00", "2:00", "3:00", "4:00"],
      },
      {
        day: "Tue",
        date: "21",
        month: "Nov",
        times: ["10:00", "11:00", "12:00", "2:00", "3:00", "4:00"],
      },
      {
        day: "Wed",
        date: "22",
        month: "Nov",
        times: ["9:00", "11:00", "1:00", "3:00", "5:00", "6:00"],
      },
    ],
  };

  const handleDaySelect = (index) => {
    setSelectedDayIndex(index);
    setSelectedTime(null);
    setShowTimeSelection(true);
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
  };

  const handleBackToCalendar = () => {
    setShowTimeSelection(false);
    setSelectedTime(null);
  };

  const handleBookAppointment = () => {
    if (selectedTime) {
      setShowConfirmation(true);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => (navigation ? navigation.goBack() : null)}
        >
          <Ionicons name="arrow-back" size={24} color="#1a237e" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Doctor Profile</Text>
        <TouchableOpacity style={styles.notificationButton}>
          <MaterialIcons name="add-home" size={24} color="#1a237e" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView}>
        {/* Doctor Info Card */}
        <View style={styles.doctorCard}>
          <Image
            source={require("../assets/images/doc.jpg")}
            style={styles.doctorImage}
          />
          <View style={styles.doctorInfo}>
            <Text style={styles.doctorName}>{doctor.name}</Text>
            <Text style={styles.doctorSpecialty}>{doctor.specialty}</Text>

            <View style={styles.statRow}>
              <View style={styles.statItem}>
                <FontAwesome name="users" size={16} color="black" />
                <Text style={styles.statText}>{doctor.patients}</Text>
              </View>
              <View style={styles.statItem}>
                <FontAwesome name="shopping-bag" size={16} color="black" />
                <Text style={styles.statText}>{doctor.experience}</Text>
              </View>
              <View style={styles.statItem}>
                <FontAwesome name="star" size={16} color="#FFD700" />
                <Text style={styles.statText}>{doctor.rating}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Available Time Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Available Time</Text>

          {!showTimeSelection ? (
            // Day Selection View
            <View style={styles.calendarRow}>
              {doctor.availableDays.map((dayData, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.dayColumn}
                  onPress={() => handleDaySelect(index)}
                >
                  <View style={styles.calendarColumn}>
                    <View style={styles.dayrow}>
                      <Text style={styles.dayText}>{dayData.day}</Text>
                      <Text style={styles.dateText}>
                        {dayData.date} {dayData.month}
                      </Text>
                    </View>
                    <View style={styles.iconContainer}>
                      <Ionicons name="partly-sunny" size={12} color="black" />
                      <Feather name="sun" size={12} color="black" />
                      <FontAwesome6 name="cloud-moon" size={12} color="black" />
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          ) : (
            // Time Selection View
            <View style={styles.timeSelectionContainer}>
              {/* Header with selected day and back button */}
              <View style={styles.timeSelectionHeader}>
                <TouchableOpacity
                  style={styles.backToCalendarButton}
                  onPress={handleBackToCalendar}
                >
                  <Ionicons name="arrow-back" size={20} color="#333" />
                </TouchableOpacity>
                <Text style={styles.selectedDayText}>
                  {doctor.availableDays[selectedDayIndex].day}
                  {"   "}
                  {doctor.availableDays[selectedDayIndex].date}{" "}
                  {doctor.availableDays[selectedDayIndex].month}
                </Text>
              </View>

              {/* Time slots grid */}
              <View style={styles.timeGrid}>
                {doctor.availableDays[selectedDayIndex].times.map(
                  (time, index) => (
                    <TouchableOpacity
                      key={index}
                      style={[
                        styles.timeSlotButton,
                        selectedTime === time && styles.selectedTimeSlot,
                      ]}
                      onPress={() => handleTimeSelect(time)}
                    >
                      <Text
                        style={[
                          styles.timeSlotText,
                          selectedTime === time && styles.selectedTimeText,
                        ]}
                      >
                        {time}
                      </Text>
                    </TouchableOpacity>
                  )
                )}
              </View>
            </View>
          )}
        </View>

        {/* About Section */}
        <View style={styles.aboutSectionContainer}>
          <Text style={styles.sectionTitle}>About Dr</Text>
          <Text style={styles.aboutText}>{doctor.about}</Text>
        </View>
      </ScrollView>

      {/* Book Appointment Button - Only show when time is selected */}
      {selectedTime && (
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.bookButton}
            onPress={handleBookAppointment}
          >
            <Text style={styles.bookButtonText}>Book Appointment</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Confirmation Modal */}
      <Modal
        visible={showConfirmation}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Meeting</Text>
            <Text style={styles.modalText}>
              Your meeting with doctor has been logged
            </Text>
            <Text style={styles.modalTime}>
              {selectedTime}{" "}
              {selectedTime && parseInt(selectedTime.split(":")[0]) < 12
                ? "AM"
                : "PM"}
            </Text>
            <Text style={styles.modalDate}>
              on {doctor.availableDays[selectedDayIndex]?.date}
              {doctor.availableDays[selectedDayIndex]?.date === "21"
                ? "st"
                : doctor.availableDays[selectedDayIndex]?.date === "22"
                ? "nd"
                : doctor.availableDays[selectedDayIndex]?.date === "23"
                ? "rd"
                : "th"}{" "}
              of {doctor.availableDays[selectedDayIndex]?.month}
            </Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => {
                setShowConfirmation(false);
                // Here you would add code to actually book the appointment
                // No need for alert anymore since the modal itself is the confirmation
              }}
            >
              <Text style={styles.closeButtonText}>CLOSE</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    paddingTop: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1a237e",
  },
  notificationButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
  },
  scrollView: {
    flex: 1,
  },
  doctorCard: {
    flexDirection: "col",
    padding: 16,
    backgroundColor: "white",
    borderRadius: 12,
    margin: 10,
  },
  doctorImage: {
    width: 370,
    height: 300,
    borderRadius: 8,
    marginRight: 16,
  },
  doctorInfo: {
    flex: 1,
    justifyContent: "center",
  },
  doctorName: {
    paddingTop: 10,
    fontSize: 18,
    fontWeight: "bold",
    color: "#1a237e",
    marginBottom: 4,
  },
  doctorSpecialty: {
    fontSize: 14,
    color: "#1a237e",
    marginBottom: 8,
  },
  statRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  statItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 16,
  },
  statText: {
    marginLeft: 6,
    fontSize: 14,
    color: "#666",
  },
  sectionContainer: {
    backgroundColor: "white",
    padding: 4,

    borderRadius: 12,
  },
  aboutSectionContainer: {
    backgroundColor: "white",
    padding: 10,
    marginHorizontal: 16,
    borderRadius: 12,
    alignItems: "flex-start",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1a237e",
    marginBottom: 12,
    textAlign: "center",
  },
  calendarRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 8,
  },
  dayColumn: {
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderRadius: 10,
    backgroundColor: "#EEF3FF",
    width: 100,
  },
  calendarColumn: {
    flexDirection: "column",
    gap: 10,
  },
  dayrow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center", // Add this to align items vertically
  },
  dayText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#333",
  },
  dateText: {
    fontSize: 14,
    color: "#333",
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  timeSelectionContainer: {
    backgroundColor: "#F5F8FF",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    padding: 10,
    borderRadius: 8,
    width: "90%",
    marginLeft: 20,
  },
  timeSelectionHeader: {
    flexDirection: "row",
    //justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
    paddingBottom: 2,
    // borderBottomWidth: 1,
    // borderBottomColor: "#E0E0E0",
  },
  backToCalendarButton: {
    padding: 8,
    marginRight: 12,
  },
  selectedDayText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1a237e",
    textAlign: "center",
    paddingLeft: 80,
  },
  timeGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  timeSlotButton: {
    width: "30%",
    // backgroundColor: "#FFFFFF",
    padding: 12,
    color: "#1a237e",
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 10,
    // borderWidth: 1,
    // borderColor: "#000000",
  },
  selectedTimeSlot: {
    backgroundColor: "#4D74FF",
    borderColor: "#4D74FF",
  },
  timeSlotText: {
    fontSize: 14,
    color: "#1a237e",
  },
  selectedTimeText: {
    color: "#FFFFFF",
  },
  aboutText: {
    fontSize: 14,
    lineHeight: 20,
    color: "#666",
  },
  buttonContainer: {
    padding: 16,
    backgroundColor: "white",
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  bookButton: {
    backgroundColor: "#1a237e",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  bookButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#003678", // Dark blue background
    borderRadius: 12,
    padding: 20,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
    color: "white",
  },
  modalText: {
    fontSize: 14,
    marginBottom: 8,
    textAlign: "center",
    color: "white",
  },
  modalTime: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
    marginTop: 4,
  },
  modalDate: {
    fontSize: 14,
    color: "white",
    marginBottom: 16,
  },
  closeButton: {
    backgroundColor: "white",
    paddingVertical: 8,
    paddingHorizontal: 24,
    borderRadius: 4,
    marginTop: 10,
  },
  closeButtonText: {
    color: "#333",
    fontWeight: "bold",
  },
  confirmButton: {
    backgroundColor: "#4CAF50",
  },
  cancelButtonText: {
    color: "#333",
    fontWeight: "bold",
  },
  confirmButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default DoctorProfileScreen;
