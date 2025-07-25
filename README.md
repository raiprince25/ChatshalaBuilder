# **BiteSpeed Frontend Task: Chatbot Flow Builder**

## **Overview**

A **pixel-perfect Chatbot Flow Builder** built using **React, ReactFlow, and Tailwind CSS**.
The project focuses on building **extensible, modular, and recruiter-friendly code** to create visually appealing chatbot flows.

A chatbot flow is constructed by **dragging, dropping, and connecting nodes (messages)** to define the order of execution.

> *I’ve aimed for a **pixel-perfect UI** using Tailwind CSS. With a **Figma design link**, this can be taken to an even higher level of design perfection.*

---

## **Features**

### **1. Text Node**

* Supports **Text Message Nodes** (WhatsApp-style message bubbles).
* Nodes include a **lock icon**, WhatsApp icon, and **responsive text wrapping** for long messages.
* Multiple text nodes can be added to the canvas.

---

### **2. Nodes Panel**

* A side panel to **drag and drop nodes** into the canvas.
* Clean and minimal UI: **Message icon + "Message" label** (designed for extensibility).
* Future-ready: Can be easily extended to include **multiple node types**.

---

### **3. Drag-and-Drop**

* Smooth **drag and drop functionality** for adding nodes from the panel to the ReactFlow canvas.

---

### **4. Edge Management**

* **Connect nodes with edges** to define flow execution.
* Real-time updates when edges are created or deleted.

---

### **5. Source & Target Handles**

* **Source Handle:** Allows only **one outgoing edge** per node to avoid invalid flows.
* **Target Handle:** Allows **multiple incoming edges**, supporting shared endpoints.

---

### **6. Settings Panel**

* Opens when a node is selected.
* Allows users to **edit the node message in real-time**.
* **Pixel-perfect alignment** with a centered header and textarea.

---

### **7. Save Button & Status Feedback**

* **Save Changes button** with a hover **border glow effect**.
* **Dynamic Status Card** (centered in the navbar) showing:

  * ✅ *"Flow saved successfully"*
  * ❌ *"Cannot save Flow"* (if there are multiple disconnected nodes).

---

## **Tech Stack**

* **React + ReactFlow** (Flow logic and drag-and-drop canvas)
* **Tailwind CSS** (Pixel-perfect design & responsiveness)
* **Heroicons** (Lock and action icons)

---
