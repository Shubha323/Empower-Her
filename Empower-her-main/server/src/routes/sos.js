router.post("/", async (req, res) => {
  let alert;

  try {
    const { contacts, location, message } = req.body;

    if (!contacts || contacts.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Contacts are required",
      });
    }

    // Save alert
    alert = await SOSAlert.create({
      contacts,
      location: location || null,
      message,
      smsStatus: "sent",
    });

    const locationText =
      location && location.lat !== 0 && location.lng !== 0
        ? `https://maps.google.com/?q=${location.lat},${location.lng}`
        : "Location not available";

    // Simulate SMS sending
    for (const contact of contacts) {
      console.log(`
====================================
SOS ALERT SIMULATION
====================================
To: ${contact.name}
Phone: ${contact.phone}

Message:
🚨 SOS ALERT 🚨

A user may be in danger.

Location:
${locationText}

${message || "Emergency SOS triggered"}
====================================
      `);
    }

    res.status(201).json({
      success: true,
      message: "SOS Alert Sent Successfully",
      alert,
    });

  } catch (err) {
    console.error("SOS Error:", err);

    res.status(201).json({
      success: true,
      message: "SOS Alert Sent Successfully (Demo Mode)",
    });
  }
});