import { e as createComponent, k as renderComponent, l as renderHead, r as renderTemplate } from '../chunks/astro/server_LHX_jZwX.mjs';
import 'piccolore';
import { $ as $$EvervaultHead, a as $$OriginalHeader } from '../chunks/OriginalHeader_D07xdS4d.mjs';
import { jsx, jsxs } from 'react/jsx-runtime';
import { useState, useRef, useCallback, useEffect } from 'react';
/* empty css                                */
export { renderers } from '../renderers.mjs';

function useCustomChat() {
  const [messages, setMessages] = useState([]);
  const [status, setStatus] = useState("ready");
  const abortControllerRef = useRef(null);
  const sendMessage = useCallback(async (message) => {
    if (!message.text.trim()) return;
    const userMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content: message.text,
      parts: [{ type: "text", text: message.text }]
    };
    setMessages((prev) => [...prev, userMessage]);
    setStatus("submitted");
    const assistantMessageId = `assistant-${Date.now()}`;
    const assistantMessage = {
      id: assistantMessageId,
      role: "assistant",
      content: "",
      parts: []
    };
    setMessages((prev) => [...prev, assistantMessage]);
    setStatus("streaming");
    const abortController = new AbortController();
    abortControllerRef.current = abortController;
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          messages: [...messages, userMessage].map((msg) => ({
            id: msg.id,
            role: msg.role,
            parts: msg.parts || [{ type: "text", text: msg.content }]
          }))
        }),
        signal: abortController.signal
      });
      if (!response.ok) {
        let errorMessage = `HTTP error! status: ${response.status}`;
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorData.error || errorMessage;
          if (errorData.details?.suggestion) {
            errorMessage += `

${errorData.details.suggestion}`;
          }
        } catch (e) {
          try {
            const errorText = await response.text();
            if (errorText) {
              errorMessage = errorText;
            }
          } catch (textError) {
          }
        }
        const error = new Error(errorMessage);
        error.status = response.status;
        throw error;
      }
      if (!response.body) {
        throw new Error("No response body");
      }
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let accumulatedText = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          break;
        }
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() || "";
        for (const line of lines) {
          if (!line.trim()) continue;
          const colonIndex = line.indexOf(":");
          if (colonIndex === -1) continue;
          try {
            const data = JSON.parse(line.slice(colonIndex + 1));
            if (data.type === "text-delta" && data.textDelta) {
              accumulatedText += data.textDelta;
              setMessages((prev) => prev.map(
                (msg) => msg.id === assistantMessageId ? {
                  ...msg,
                  content: accumulatedText,
                  parts: [{ type: "text", text: accumulatedText }]
                } : msg
              ));
            } else if (data.type === "text") {
              if (data.text) {
                accumulatedText = data.text;
              }
              setMessages((prev) => prev.map(
                (msg) => msg.id === assistantMessageId ? {
                  ...msg,
                  content: accumulatedText,
                  parts: [{ type: "text", text: accumulatedText }]
                } : msg
              ));
            }
          } catch (e) {
            console.warn("⚠️ Failed to parse stream chunk:", e, "Line:", line.substring(0, 100));
          }
        }
      }
      setStatus("ready");
    } catch (error) {
      if (error.name === "AbortError") {
        setStatus("ready");
        return;
      }
      console.error("❌ Chat error:", error);
      setMessages((prev) => prev.map(
        (msg) => msg.id === assistantMessageId ? {
          ...msg,
          content: `Error: ${error.message || "Failed to get response"}`,
          parts: [{ type: "text", text: `Error: ${error.message || "Failed to get response"}` }]
        } : msg
      ));
      setStatus("ready");
    } finally {
      abortControllerRef.current = null;
    }
  }, [messages]);
  return {
    messages: messages.map((msg) => ({
      ...msg,
      // Ensure compatibility with UIMessage format
      parts: msg.parts || [{ type: "text", text: msg.content }]
    })),
    status,
    sendMessage,
    isLoading: status === "streaming" || status === "submitted"
  };
}

class PropertyResolver {
  dataModels;
  constructor(dataModels) {
    this.dataModels = dataModels;
  }
  /**
   * Resolve property value (literal or data binding)
   */
  resolveValue(property, surfaceId) {
    if (!property) return void 0;
    if (typeof property === "string") {
      return property;
    }
    if (property.literalString !== void 0) {
      return property.literalString;
    }
    if (property.literalNumber !== void 0) {
      return property.literalNumber;
    }
    if (property.literalBoolean !== void 0) {
      return property.literalBoolean;
    }
    if (property.literalStringList !== void 0) {
      return property.literalStringList;
    }
    if (property.path !== void 0 && surfaceId) {
      return this.resolveDataBinding(property.path, surfaceId);
    }
    return property;
  }
  /**
   * Resolve data binding path
   */
  resolveDataBinding(path, surfaceId) {
    const dataModel = this.dataModels.get(surfaceId);
    if (!dataModel) return `[Data: ${path}]`;
    const pathSegments = path.replace(/^\//, "").split("/");
    let value = dataModel;
    for (const segment of pathSegments) {
      if (value && typeof value === "object") {
        value = value[segment];
      } else {
        return `[Data: ${path}]`;
      }
    }
    return value;
  }
  /**
   * Set data binding value
   */
  setBindingValue(path, value, surfaceId) {
    const dataModel = this.dataModels.get(surfaceId);
    if (!dataModel) return;
    const pathSegments = path.replace(/^\//, "").split("/");
    let obj = dataModel;
    for (let i = 0; i < pathSegments.length - 1; i++) {
      if (!obj[pathSegments[i]]) obj[pathSegments[i]] = {};
      obj = obj[pathSegments[i]];
    }
    obj[pathSegments[pathSegments.length - 1]] = value;
  }
}

function createTextElement(id, properties, surfaceId, propertyResolver) {
  const element = document.createElement("div");
  element.className = "a2ui-text";
  element.setAttribute("data-component-id", id);
  if (properties.text && typeof properties.text === "object" && properties.text.path) {
    element.dataset.bindingTextPath = properties.text.path;
  }
  const text = propertyResolver.resolveValue(properties.text, surfaceId);
  element.textContent = (text ?? "").toString();
  const mapVariantToClass = (variant) => {
    switch (variant) {
      case "h1":
        return "text-extraLarge";
      case "h2":
        return "text-large";
      case "h3":
        return "text-h3";
      case "h4":
        return "text-h4";
      case "h5":
        return "text-h5";
      case "body":
        return "text-medium";
      case "caption":
        return "text-small";
      default:
        return `text-${variant}`;
    }
  };
  if (properties.variant) {
    const mapped = mapVariantToClass(properties.variant);
    if (mapped) {
      element.classList.add(mapped);
    }
  } else if (properties.usageHint) {
    element.classList.add(`text-${properties.usageHint}`);
  }
  if (properties.style) {
    Object.entries(properties.style).forEach(([key, value]) => {
      if (typeof value === "string") {
        element.style.setProperty(key, value);
      }
    });
  }
  return element;
}

function get404PlaceholderURL(_width = 512, _height = 320) {
  return "/image-404-placeholder.svg";
}

function createImageElement(id, properties, surfaceId, propertyResolver) {
  const element = document.createElement("img");
  element.className = "a2ui-image";
  element.setAttribute("data-component-id", id);
  if (properties.url && typeof properties.url === "object" && properties.url.path) {
    element.dataset.bindingUrlPath = properties.url.path;
  }
  const url = propertyResolver.resolveValue(properties.url, surfaceId);
  if (url) {
    console.log(`🖼️ Loading image for component ${id}:`, url);
    element.src = url;
  } else {
    console.warn(`⚠️ No URL found for image component ${id}`);
  }
  if (properties.usageHint) {
    element.classList.add(`image-${properties.usageHint}`);
  }
  if (properties.fit) {
    element.style.objectFit = properties.fit;
  }
  element.addEventListener("error", () => {
    console.error(`❌ Image load failed for component ${id}, URL:`, element.src);
    const placeholderUrl = get404PlaceholderURL(512, 320);
    element.src = placeholderUrl;
    element.alt = "Image not found (404)";
    if (!element.style.width && !element.style.height) {
      element.style.width = "512px";
      element.style.height = "320px";
      element.style.objectFit = "contain";
    }
  });
  return element;
}

function createButtonElement(id, properties, componentElements, handleAction, propertyResolver, surfaceId) {
  const element = document.createElement("button");
  element.className = "a2ui-button";
  element.setAttribute("data-component-id", id);
  if (properties.primary) {
    element.classList.add("button-primary");
  }
  const childrenIds = [];
  if (properties.children && Array.isArray(properties.children)) {
    childrenIds.push(...properties.children);
  } else if (properties.child) {
    childrenIds.push(properties.child);
  }
  if (childrenIds.length > 0) {
    element.dataset.buttonChildren = JSON.stringify(childrenIds);
  }
  childrenIds.forEach((childId) => {
    const childElement = componentElements.get(childId);
    if (childElement) {
      element.appendChild(childElement);
    }
  });
  if (properties.action) {
    element.addEventListener("click", () => {
      const listItemDataStr = element.dataset.listItemData;
      let finalAction = { ...properties.action };
      if (listItemDataStr) {
        try {
          const listItemData = JSON.parse(listItemDataStr);
          console.log("📦 Found List item data for button:", listItemData);
          if (finalAction.context) {
            finalAction.context = {
              ...listItemData,
              ...finalAction.context
              // Action context takes precedence
            };
          } else {
            finalAction.context = listItemData;
          }
          console.log("🔘 Final action with merged context:", finalAction);
        } catch (error) {
          console.error("❌ Failed to parse list item data:", error);
        }
      }
      const surfaceElement = element.closest("[data-surface-id]");
      const resolvedSurfaceId = surfaceId || surfaceElement?.getAttribute("data-surface-id") || "main";
      const sourceComponentId = id;
      const timestamp = (/* @__PURE__ */ new Date()).toISOString();
      const resolvedContext = {};
      if (finalAction.context) {
        for (const [key, value] of Object.entries(finalAction.context)) {
          if (value && typeof value === "object" && !Array.isArray(value) && "path" in value && propertyResolver && resolvedSurfaceId) {
            resolvedContext[key] = propertyResolver.resolveValue(value, resolvedSurfaceId);
            console.log(`🔗 Resolved context[${key}] from path ${value.path}:`, resolvedContext[key]);
          } else {
            resolvedContext[key] = value;
          }
        }
      }
      const a2uiActionMessage = {
        action: {
          name: finalAction.name,
          surfaceId: resolvedSurfaceId,
          sourceComponentId,
          timestamp,
          context: resolvedContext
        }
      };
      console.log("📤 A2UI standard action message:", JSON.stringify(a2uiActionMessage, null, 2));
      handleAction(a2uiActionMessage);
    });
  }
  return element;
}
function attachButtonChildren(buttonElement, componentElements) {
  const childrenIdsStr = buttonElement.dataset.buttonChildren;
  if (!childrenIdsStr) return;
  try {
    const childrenIds = JSON.parse(childrenIdsStr);
    childrenIds.forEach((childId) => {
      const childElement = componentElements.get(childId);
      if (childElement && !buttonElement.contains(childElement)) {
        buttonElement.appendChild(childElement);
        console.log(`🔗 Attached ${childId} to button ${buttonElement.getAttribute("data-component-id")}`);
      }
    });
  } catch (error) {
    console.error("Failed to parse button children IDs:", error);
  }
}

function createCardElement(id, _properties) {
  const element = document.createElement("div");
  element.className = "a2ui-card";
  element.setAttribute("data-component-id", id);
  return element;
}

function createRowElement(id, properties) {
  const element = document.createElement("div");
  element.className = "a2ui-row";
  element.setAttribute("data-component-id", id);
  if (properties.justify) {
    const justify = properties.justify;
    const justifyClassMap = {
      start: "align-start",
      center: "align-center",
      end: "align-end",
      spaceBetween: "align-spaceBetween",
      spaceAround: "align-spaceAround",
      spaceEvenly: "align-spaceAround",
      stretch: "align-start"
    };
    const cls = justifyClassMap[justify];
    if (cls) {
      element.classList.add(cls);
    }
  }
  if (properties.align) {
    const align = properties.align;
    const alignClassMap = {
      start: "align-start",
      center: "align-center",
      end: "align-end",
      stretch: "align-start"
    };
    const cls = alignClassMap[align];
    if (cls) {
      element.classList.add(cls);
    }
  }
  if (properties.alignment) {
    element.classList.add(`align-${properties.alignment}`);
  }
  return element;
}
function createColumnElement(id, properties) {
  const element = document.createElement("div");
  element.className = "a2ui-column";
  element.setAttribute("data-component-id", id);
  if (properties.justify) {
    const justify = properties.justify;
    const justifyClassMap = {
      start: "align-start",
      center: "align-center",
      end: "align-end",
      spaceBetween: "align-spaceBetween",
      spaceAround: "align-spaceAround",
      spaceEvenly: "align-spaceAround",
      stretch: "align-start"
    };
    const cls = justifyClassMap[justify];
    if (cls) {
      element.classList.add(cls);
    }
  }
  if (properties.align) {
    const align = properties.align;
    const alignClassMap = {
      start: "align-start",
      center: "align-center",
      end: "align-end",
      stretch: "align-start"
    };
    const cls = alignClassMap[align];
    if (cls) {
      element.classList.add(cls);
    }
  }
  if (properties.alignment) {
    element.classList.add(`align-${properties.alignment}`);
  }
  return element;
}
function createListElement(id, properties, _surfaceId) {
  const element = document.createElement("div");
  element.className = "a2ui-list";
  element.setAttribute("data-component-id", id);
  if (properties.direction) {
    element.classList.add(`list-${properties.direction}`);
  }
  if (properties.children && !Array.isArray(properties.children)) {
    const config = properties.children;
    if (config.componentId && config.path) {
      element.dataset.bindingListPath = config.path;
      element.dataset.templateComponentId = config.componentId;
    }
  }
  return element;
}

function createDividerElement(id, properties) {
  const element = document.createElement("hr");
  element.className = "a2ui-divider";
  element.setAttribute("data-component-id", id);
  if (properties.axis === "vertical") {
    element.classList.add("divider-vertical");
  }
  return element;
}
function createIconElement(id, properties, surfaceId, propertyResolver) {
  const element = document.createElement("div");
  element.className = "a2ui-icon";
  element.setAttribute("data-component-id", id);
  if (properties.name && typeof properties.name === "object" && properties.name.path) {
    element.dataset.bindingIconNamePath = properties.name.path;
  }
  const iconName = propertyResolver.resolveValue(properties.name, surfaceId);
  if (iconName) {
    element.textContent = iconName;
    element.setAttribute("data-icon-name", iconName.toString());
  }
  return element;
}

function extractYouTubeVideoId(url) {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
    /youtube\.com\/watch\?.*v=([^&\n?#]+)/
  ];
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }
  return null;
}
function isYouTubeURL(url) {
  return /youtube\.com|youtu\.be/.test(url);
}
function convertYouTubeToEmbed(url) {
  const videoId = extractYouTubeVideoId(url);
  if (videoId) {
    return `https://www.youtube.com/embed/${videoId}`;
  }
  return url;
}
function createVideoElement(id, properties, surfaceId, propertyResolver) {
  const url = propertyResolver.resolveValue(properties.url, surfaceId);
  if (!url) {
    console.warn(`⚠️ No URL found for video component ${id}`);
    const errorDiv = document.createElement("div");
    errorDiv.className = "a2ui-video-error";
    errorDiv.textContent = "No video URL provided";
    return errorDiv;
  }
  const urlString = String(url);
  console.log(`🎥 Loading video for component ${id}:`, urlString);
  if (isYouTubeURL(urlString)) {
    const embedUrl = convertYouTubeToEmbed(urlString);
    console.log(`📺 YouTube video detected, converting to embed URL:`, embedUrl);
    const container = document.createElement("div");
    container.className = "a2ui-video-container a2ui-video-youtube";
    container.setAttribute("data-component-id", id);
    if (properties.url && typeof properties.url === "object" && properties.url.path) {
      container.dataset.bindingUrlPath = properties.url.path;
    }
    const iframe = document.createElement("iframe");
    iframe.className = "a2ui-video-iframe";
    iframe.src = embedUrl;
    iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
    iframe.allowFullscreen = true;
    iframe.setAttribute("frameborder", "0");
    iframe.style.width = "100%";
    iframe.style.height = "100%";
    iframe.style.minHeight = "400px";
    iframe.style.borderRadius = "12px";
    container.appendChild(iframe);
    return container;
  }
  const element = document.createElement("video");
  element.className = "a2ui-video";
  element.setAttribute("data-component-id", id);
  element.controls = true;
  if (properties.url && typeof properties.url === "object" && properties.url.path) {
    element.dataset.bindingUrlPath = properties.url.path;
  }
  element.src = urlString;
  element.addEventListener("error", () => {
    console.error(`❌ Video load failed for component ${id}, URL:`, element.src);
  });
  return element;
}

function createAudioElement(id, properties, surfaceId, propertyResolver) {
  const container = document.createElement("div");
  container.className = "a2ui-audio-container";
  container.setAttribute("data-component-id", id);
  const element = document.createElement("audio");
  element.className = "a2ui-audio";
  element.controls = true;
  if (properties.url && typeof properties.url === "object" && properties.url.path) {
    element.dataset.bindingUrlPath = properties.url.path;
  }
  const url = propertyResolver.resolveValue(properties.url, surfaceId);
  if (url) {
    console.log(`🎵 Loading audio for component ${id}:`, url);
    element.src = url;
  } else {
    console.warn(`⚠️ No URL found for audio component ${id}`);
  }
  if (properties.description) {
    const description = propertyResolver.resolveValue(properties.description, surfaceId);
    if (description) {
      const descElement = document.createElement("div");
      descElement.className = "a2ui-audio-description";
      descElement.textContent = String(description);
      container.appendChild(descElement);
    }
  }
  container.appendChild(element);
  element.addEventListener("error", () => {
    console.error(`❌ Audio load failed for component ${id}, URL:`, element.src);
  });
  return container;
}

function createTextFieldElement(id, properties, surfaceId, propertyResolver) {
  const container = document.createElement("div");
  container.className = "a2ui-textfield-container";
  container.setAttribute("data-component-id", id);
  const label = propertyResolver.resolveValue(properties.label, surfaceId);
  if (label) {
    const labelElement = document.createElement("label");
    labelElement.className = "a2ui-textfield-label";
    labelElement.textContent = String(label);
    container.appendChild(labelElement);
  }
  const input = document.createElement(properties.variant === "longText" ? "textarea" : "input");
  input.className = "a2ui-textfield-input";
  if (properties.value && typeof properties.value === "object" && properties.value.path) {
    input.dataset.bindingValuePath = properties.value.path;
  }
  const value = propertyResolver.resolveValue(properties.value, surfaceId);
  if (value !== null && value !== void 0) {
    if (input instanceof HTMLInputElement) {
      input.value = String(value);
    } else if (input instanceof HTMLTextAreaElement) {
      input.value = String(value);
    }
  }
  if (input instanceof HTMLInputElement) {
    if (properties.variant === "number") {
      input.type = "number";
    } else if (properties.variant === "obscured") {
      input.type = "password";
    } else {
      input.type = "text";
    }
  }
  input.addEventListener("input", () => {
    console.log(`TextField ${id} value changed:`, input.value);
  });
  container.appendChild(input);
  return container;
}
function createCheckBoxElement(id, properties, surfaceId, propertyResolver) {
  const container = document.createElement("div");
  container.className = "a2ui-checkbox-container";
  container.setAttribute("data-component-id", id);
  const input = document.createElement("input");
  input.type = "checkbox";
  input.className = "a2ui-checkbox-input";
  if (properties.value && typeof properties.value === "object" && properties.value.path) {
    input.dataset.bindingValuePath = properties.value.path;
  }
  const value = propertyResolver.resolveValue(properties.value, surfaceId);
  if (typeof value === "boolean") {
    input.checked = value;
  }
  const label = propertyResolver.resolveValue(properties.label, surfaceId);
  if (label) {
    const labelElement = document.createElement("label");
    labelElement.className = "a2ui-checkbox-label";
    labelElement.textContent = String(label);
    labelElement.appendChild(input);
    container.appendChild(labelElement);
  } else {
    container.appendChild(input);
  }
  input.addEventListener("change", () => {
    console.log(`CheckBox ${id} value changed:`, input.checked);
  });
  return container;
}
function createSliderElement(id, properties, surfaceId, propertyResolver) {
  const container = document.createElement("div");
  container.className = "a2ui-slider-container";
  container.setAttribute("data-component-id", id);
  const label = propertyResolver.resolveValue(properties.label, surfaceId);
  if (label) {
    const labelElement = document.createElement("div");
    labelElement.className = "a2ui-slider-label";
    labelElement.textContent = String(label);
    container.appendChild(labelElement);
  }
  const sliderWrapper = document.createElement("div");
  sliderWrapper.style.display = "flex";
  sliderWrapper.style.alignItems = "center";
  sliderWrapper.style.gap = "14px";
  sliderWrapper.style.width = "100%";
  const input = document.createElement("input");
  input.type = "range";
  input.className = "a2ui-slider-input";
  input.min = String(properties.min ?? 0);
  input.max = String(properties.max ?? 100);
  if (properties.value && typeof properties.value === "object" && properties.value.path) {
    input.dataset.bindingValuePath = properties.value.path;
  }
  const value = propertyResolver.resolveValue(properties.value, surfaceId);
  if (value !== null && value !== void 0) {
    input.value = String(value);
  }
  const valueDisplay = document.createElement("span");
  valueDisplay.className = "a2ui-slider-value";
  valueDisplay.textContent = input.value;
  input.addEventListener("input", () => {
    valueDisplay.textContent = input.value;
    console.log(`Slider ${id} value changed:`, input.value);
  });
  sliderWrapper.appendChild(input);
  sliderWrapper.appendChild(valueDisplay);
  container.appendChild(sliderWrapper);
  return container;
}
function createDateTimeInputElement(id, properties, surfaceId, propertyResolver) {
  const container = document.createElement("div");
  container.className = "a2ui-datetime-container";
  container.setAttribute("data-component-id", id);
  const enableDate = properties.enableDate !== false;
  const enableTime = properties.enableTime !== false;
  if (properties.value && typeof properties.value === "object" && properties.value.path) {
    container.dataset.bindingValuePath = properties.value.path;
  }
  const value = propertyResolver.resolveValue(properties.value, surfaceId);
  if (enableDate && enableTime) {
    const input2 = document.createElement("input");
    input2.type = "datetime-local";
    input2.className = "a2ui-datetime-input";
    if (value) {
      input2.value = String(value);
    }
    container.appendChild(input2);
  } else if (enableDate) {
    const input2 = document.createElement("input");
    input2.type = "date";
    input2.className = "a2ui-datetime-input";
    if (value) {
      input2.value = String(value);
    }
    container.appendChild(input2);
  } else if (enableTime) {
    const input2 = document.createElement("input");
    input2.type = "time";
    input2.className = "a2ui-datetime-input";
    if (value) {
      input2.value = String(value);
    }
    container.appendChild(input2);
  }
  const input = container.querySelector("input");
  if (input) {
    input.addEventListener("change", () => {
      console.log(`DateTimeInput ${id} value changed:`, input.value);
    });
  }
  return container;
}
function createChoicePickerElement(id, properties, surfaceId, propertyResolver) {
  const container = document.createElement("div");
  container.className = "a2ui-choicepicker-container";
  container.setAttribute("data-component-id", id);
  const label = propertyResolver.resolveValue(properties.label, surfaceId);
  if (label) {
    const labelElement = document.createElement("div");
    labelElement.className = "a2ui-choicepicker-label";
    labelElement.textContent = String(label);
    container.appendChild(labelElement);
  }
  const variant = properties.variant || "mutuallyExclusive";
  const isMultiple = variant === "multipleSelection";
  if (properties.value && typeof properties.value === "object" && properties.value.path) {
    container.dataset.bindingValuePath = properties.value.path;
  }
  const selectedValues = propertyResolver.resolveValue(properties.value, surfaceId);
  const selectedSet = new Set(Array.isArray(selectedValues) ? selectedValues : []);
  const options = properties.options || [];
  options.forEach((option) => {
    const optionLabel = propertyResolver.resolveValue(option.label, surfaceId);
    const optionValue = option.value;
    const optionContainer = document.createElement("div");
    optionContainer.className = "a2ui-choicepicker-option";
    const input = document.createElement("input");
    input.type = isMultiple ? "checkbox" : "radio";
    if (!isMultiple) {
      input.name = `choicepicker-${id}`;
    }
    input.value = optionValue;
    input.checked = selectedSet.has(optionValue);
    const labelElement = document.createElement("label");
    labelElement.className = "a2ui-choicepicker-option-label";
    labelElement.textContent = String(optionLabel || optionValue);
    labelElement.appendChild(input);
    optionContainer.appendChild(labelElement);
    container.appendChild(optionContainer);
    input.addEventListener("change", () => {
      console.log(`ChoicePicker ${id} value changed:`, optionValue, input.checked);
    });
  });
  return container;
}

const loadChartJS = () => {
  return new Promise((resolve, reject) => {
    if (window.Chart) {
      resolve();
      return;
    }
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js";
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Failed to load Chart.js"));
    document.head.appendChild(script);
  });
};
async function createChartElement(id, properties, surfaceId, propertyResolver) {
  const container = document.createElement("div");
  container.className = "a2ui-chart-container";
  container.setAttribute("data-component-id", id);
  try {
    await loadChartJS();
  } catch (error) {
    console.error("❌ Failed to load Chart.js:", error);
    const errorDiv = document.createElement("div");
    errorDiv.className = "a2ui-chart-error";
    errorDiv.textContent = "Failed to load chart library";
    container.appendChild(errorDiv);
    return container;
  }
  const Chart = window.Chart;
  if (!Chart) {
    console.error("❌ Chart.js not available");
    const errorDiv = document.createElement("div");
    errorDiv.className = "a2ui-chart-error";
    errorDiv.textContent = "Chart library not available";
    container.appendChild(errorDiv);
    return container;
  }
  const canvas = document.createElement("canvas");
  canvas.className = "a2ui-chart-canvas";
  container.appendChild(canvas);
  const chartType = properties.type || "bar";
  const title = propertyResolver.resolveValue(properties.title, surfaceId);
  const xLabel = propertyResolver.resolveValue(properties.xLabel, surfaceId);
  const yLabel = propertyResolver.resolveValue(properties.yLabel, surfaceId);
  const data = properties.data || [];
  let chartData;
  let chartOptions;
  if (chartType === "pie" || chartType === "doughnut") {
    chartData = {
      labels: data.map((item) => item.label || item.x || ""),
      datasets: [{
        data: data.map((item) => item.value || item.y || 0),
        backgroundColor: [
          "rgba(102, 51, 238, 0.8)",
          "rgba(59, 130, 246, 0.8)",
          "rgba(16, 185, 129, 0.8)",
          "rgba(245, 158, 11, 0.8)",
          "rgba(239, 68, 68, 0.8)",
          "rgba(139, 92, 246, 0.8)",
          "rgba(236, 72, 153, 0.8)",
          "rgba(14, 165, 233, 0.8)"
        ],
        borderColor: "rgba(255, 255, 255, 0.1)",
        borderWidth: 1
      }]
    };
    chartOptions = {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: {
          position: "bottom",
          labels: {
            color: "rgba(255, 255, 255, 0.9)",
            padding: 15,
            font: {
              size: 12
            }
          }
        },
        title: title ? {
          display: true,
          text: String(title),
          color: "rgba(255, 255, 255, 0.9)",
          font: {
            size: 16,
            weight: "bold"
          },
          padding: {
            bottom: 20
          }
        } : void 0
      }
    };
  } else if (chartType === "radar" || chartType === "polarArea") {
    chartData = {
      labels: data.map((item) => item.label || item.x || ""),
      datasets: [{
        label: title ? String(title) : "Data",
        data: data.map((item) => item.value || item.y || 0),
        backgroundColor: "rgba(102, 51, 238, 0.2)",
        borderColor: "rgba(102, 51, 238, 0.8)",
        borderWidth: 2,
        pointBackgroundColor: "rgba(102, 51, 238, 0.8)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgba(102, 51, 238, 0.8)"
      }]
    };
    chartOptions = {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: {
          position: "bottom",
          labels: {
            color: "rgba(255, 255, 255, 0.9)"
          }
        }
      },
      scales: chartType === "radar" ? {
        r: {
          beginAtZero: true,
          ticks: {
            color: "rgba(255, 255, 255, 0.7)"
          },
          grid: {
            color: "rgba(255, 255, 255, 0.1)"
          },
          pointLabels: {
            color: "rgba(255, 255, 255, 0.9)"
          }
        }
      } : void 0
    };
  } else {
    const labels = data.map((item) => item.x || item.label || "");
    const values = data.map((item) => item.y || item.value || 0);
    chartData = {
      labels,
      datasets: [{
        label: title ? String(title) : "Data",
        data: values,
        backgroundColor: chartType === "bar" ? "rgba(102, 51, 238, 0.8)" : "rgba(102, 51, 238, 0.1)",
        borderColor: "rgba(102, 51, 238, 0.8)",
        borderWidth: 2,
        fill: chartType === "line",
        tension: chartType === "line" ? 0.4 : 0,
        pointBackgroundColor: "rgba(102, 51, 238, 0.8)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgba(102, 51, 238, 0.8)"
      }]
    };
    chartOptions = {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: {
          display: !!title,
          position: "top",
          labels: {
            color: "rgba(255, 255, 255, 0.9)"
          }
        },
        title: title ? {
          display: true,
          text: String(title),
          color: "rgba(255, 255, 255, 0.9)",
          font: {
            size: 16,
            weight: "bold"
          },
          padding: {
            bottom: 20
          }
        } : void 0
      },
      scales: {
        x: {
          title: {
            display: !!xLabel,
            text: xLabel ? String(xLabel) : "",
            color: "rgba(255, 255, 255, 0.7)"
          },
          ticks: {
            color: "rgba(255, 255, 255, 0.7)"
          },
          grid: {
            color: "rgba(255, 255, 255, 0.1)"
          }
        },
        y: {
          beginAtZero: true,
          title: {
            display: !!yLabel,
            text: yLabel ? String(yLabel) : "",
            color: "rgba(255, 255, 255, 0.7)"
          },
          ticks: {
            color: "rgba(255, 255, 255, 0.7)"
          },
          grid: {
            color: "rgba(255, 255, 255, 0.1)"
          }
        }
      }
    };
  }
  try {
    const chartInstance = new Chart(canvas, {
      type: chartType,
      data: chartData,
      options: chartOptions
    });
    container.chartInstance = chartInstance;
    console.log(`📊 Chart created: ${id} (${chartType})`);
  } catch (error) {
    console.error(`❌ Failed to create chart ${id}:`, error);
    const errorDiv = document.createElement("div");
    errorDiv.className = "a2ui-chart-error";
    errorDiv.textContent = `Chart error: ${error?.message || error}`;
    container.innerHTML = "";
    container.appendChild(errorDiv);
  }
  return container;
}

class ComponentFactory {
  propertyResolver;
  componentElements;
  actionHandler;
  constructor(propertyResolver, componentElements, actionHandler) {
    this.propertyResolver = propertyResolver;
    this.componentElements = componentElements;
    this.actionHandler = actionHandler;
  }
  /**
   * Create component element from A2UI v0.9 component definition
   */
  createComponent(component, surfaceId) {
    const { id, component: componentType, weight, ...properties } = component;
    let element;
    switch (componentType) {
      case "Text":
        element = createTextElement(id, properties, surfaceId, this.propertyResolver);
        break;
      case "Image":
        element = createImageElement(id, properties, surfaceId, this.propertyResolver);
        break;
      case "Button":
        element = createButtonElement(id, properties, this.componentElements, this.actionHandler, this.propertyResolver, surfaceId);
        break;
      case "Card":
        element = createCardElement(id);
        break;
      case "Row":
        element = createRowElement(id, properties);
        break;
      case "Column":
        element = createColumnElement(id, properties);
        break;
      case "List":
        element = createListElement(id, properties);
        break;
      case "Divider":
        element = createDividerElement(id, properties);
        break;
      case "Icon":
        element = createIconElement(id, properties, surfaceId, this.propertyResolver);
        break;
      case "Video":
        element = createVideoElement(id, properties, surfaceId, this.propertyResolver);
        break;
      case "AudioPlayer":
        element = createAudioElement(id, properties, surfaceId, this.propertyResolver);
        break;
      case "TextField":
        element = createTextFieldElement(id, properties, surfaceId, this.propertyResolver);
        break;
      case "CheckBox":
        element = createCheckBoxElement(id, properties, surfaceId, this.propertyResolver);
        break;
      case "Slider":
        element = createSliderElement(id, properties, surfaceId, this.propertyResolver);
        break;
      case "DateTimeInput":
        element = createDateTimeInputElement(id, properties, surfaceId, this.propertyResolver);
        break;
      case "ChoicePicker":
        element = createChoicePickerElement(id, properties, surfaceId, this.propertyResolver);
        break;
      case "Chart":
        element = document.createElement("div");
        element.className = "a2ui-chart-loading";
        element.textContent = "Loading chart...";
        createChartElement(id, properties, surfaceId, this.propertyResolver).then((chartElement) => {
          element.replaceWith(chartElement);
          this.componentElements.set(id, chartElement);
        }).catch((error) => {
          console.error(`❌ Failed to create chart ${id}:`, error);
          element.className = "a2ui-chart-error";
          element.textContent = `Chart error: ${error}`;
        });
        break;
      default:
        console.warn(`Unknown component type: ${componentType}`);
        element = createTextElement(id, { text: `Unknown component: ${componentType}` }, surfaceId, this.propertyResolver);
    }
    if (weight !== void 0) {
      element.style.flexGrow = weight.toString();
    }
    return element;
  }
}

class MessageHandlers {
  container;
  surfaces;
  dataModels;
  componentElements;
  rootComponents;
  componentFactory;
  propertyResolver;
  constructor(container, surfaces, dataModels, componentElements, rootComponents, componentFactory, propertyResolver) {
    this.container = container;
    this.surfaces = surfaces;
    this.dataModels = dataModels;
    this.componentElements = componentElements;
    this.rootComponents = rootComponents;
    this.componentFactory = componentFactory;
    this.propertyResolver = propertyResolver;
  }
  /**
   * Handle createSurface message (v0.9 format)
   */
  handleCreateSurface(data) {
    const { surfaceId, catalogId } = data;
    const surfaceElement = document.createElement("div");
    surfaceElement.className = "a2ui-surface";
    surfaceElement.setAttribute("data-surface-id", surfaceId);
    surfaceElement.setAttribute("data-catalog-id", catalogId);
    this.container.appendChild(surfaceElement);
    this.surfaces.set(surfaceId, surfaceElement);
    if (!this.dataModels.has(surfaceId)) {
      this.dataModels.set(surfaceId, {});
    }
    console.log(`✅ Created surface: ${surfaceId} with catalog: ${catalogId}`);
  }
  /**
   * Handle updateComponents message (v0.9 format)
   */
  handleUpdateComponents(data) {
    const { surfaceId, components } = data;
    const surface = this.surfaces.get(surfaceId);
    if (!surface) {
      console.error(`❌ Surface not found: ${surfaceId}`);
      return;
    }
    this.clearSurfaceComponents(surfaceId);
    const inlineComponents = [];
    components.forEach((component) => {
      if (component.component === "Button" && component.children && Array.isArray(component.children)) {
        component.children.forEach((child, index) => {
          if (typeof child === "object" && child.id && child.component) {
            console.log(`🔧 Found inline component in Button ${component.id}:`, child);
            inlineComponents.push(child);
            component.children[index] = child.id;
          }
        });
      }
    });
    if (inlineComponents.length > 0) {
      components.push(...inlineComponents);
      console.log(`📦 Added ${inlineComponents.length} inline components from Button children`);
    }
    components.forEach((component) => {
      try {
        const element = this.componentFactory.createComponent(component, surfaceId);
        this.componentElements.set(component.id, element);
        console.log(`✅ Created component: ${component.id} (${component.component})`);
      } catch (error) {
        console.error(`❌ Failed to create component ${component.id}:`, error);
      }
    });
    components.forEach((component) => {
      const parentElement = this.componentElements.get(component.id);
      if (!parentElement) return;
      if (component.children && Array.isArray(component.children)) {
        component.children.forEach((childId) => {
          const childElement = this.componentElements.get(childId);
          if (childElement) {
            if (component.component === "Button") ; else {
              parentElement.appendChild(childElement);
              console.log(`🔗 Connected ${childId} to parent ${component.id}`);
            }
          } else {
            console.warn(`⚠️ Child component not found: ${childId}`);
          }
        });
      }
    });
    components.forEach((component) => {
      if (component.component === "Button") {
        const buttonElement = this.componentElements.get(component.id);
        if (buttonElement) {
          attachButtonChildren(buttonElement, this.componentElements);
        }
      }
    });
    const rootComponent = components.find((c) => c.id === "root");
    if (rootComponent) {
      const rootElement = this.componentElements.get("root");
      if (rootElement) {
        surface.appendChild(rootElement);
        this.rootComponents.set(surfaceId, "root");
        console.log(`🌳 Added root component to surface: ${surfaceId}`);
      }
    } else {
      components.forEach((component) => {
        const isChild = components.some(
          (c) => c.children && Array.isArray(c.children) && c.children.includes(component.id)
        );
        if (!isChild) {
          const element = this.componentElements.get(component.id);
          if (element) {
            surface.appendChild(element);
            console.log(`🌱 Added top-level component: ${component.id}`);
          }
        }
      });
    }
    console.log(`✅ Updated ${components.length} components for surface: ${surfaceId}`);
  }
  /**
   * Handle updateDataModel message (v0.9 format with HLC timestamps)
   */
  handleUpdateDataModel(data) {
    const { surfaceId, updates, versions } = data;
    let dataModel = this.dataModels.get(surfaceId);
    if (!dataModel) {
      dataModel = {};
      this.dataModels.set(surfaceId, dataModel);
    }
    updates.forEach((update) => {
      try {
        this.applyDataUpdate(dataModel, update);
      } catch (error) {
        console.error(`❌ Failed to apply data update at ${update.path}:`, error);
      }
    });
    this.storeVersionVector(surfaceId, versions);
    this.updateComponentsWithData(surfaceId);
    console.log(`✅ Updated data model for surface: ${surfaceId} (${updates.length} updates)`);
  }
  /**
   * Handle deleteSurface message
   */
  handleDeleteSurface(data) {
    const { surfaceId } = data;
    const surface = this.surfaces.get(surfaceId);
    if (surface) {
      surface.remove();
      this.surfaces.delete(surfaceId);
    }
    this.dataModels.delete(surfaceId);
    this.rootComponents.delete(surfaceId);
    this.componentElements.forEach((element, id) => {
      if (element && element.closest && element.closest(`[data-surface-id="${surfaceId}"]`)) {
        this.componentElements.delete(id);
      }
    });
    console.log(`✅ Deleted surface: ${surfaceId}`);
  }
  // Legacy method for backward compatibility
  handleBeginRendering(data) {
    console.warn("⚠️ beginRendering is deprecated, use createSurface instead");
    this.handleCreateSurface({
      surfaceId: data.surfaceId,
      catalogId: "legacy-catalog"
    });
  }
  // Legacy method for backward compatibility  
  handleSurfaceUpdate(data) {
    console.warn("⚠️ surfaceUpdate is deprecated, use updateComponents instead");
    this.handleUpdateComponents({
      surfaceId: data.surfaceId,
      components: data.components
    });
  }
  clearSurfaceComponents(surfaceId) {
    const surface = this.surfaces.get(surfaceId);
    if (surface) {
      surface.innerHTML = "";
    }
    this.componentElements.forEach((element, id) => {
      if (element && element.closest && element.closest(`[data-surface-id="${surfaceId}"]`)) {
        this.componentElements.delete(id);
      }
    });
  }
  applyDataUpdate(dataModel, update) {
    const { path, value, hlc, pos } = update;
    const pathParts = path.split("/").filter(Boolean);
    let current = dataModel;
    for (let i = 0; i < pathParts.length - 1; i++) {
      const part = pathParts[i];
      if (!(part in current)) {
        current[part] = {};
      }
      current = current[part];
    }
    const finalKey = pathParts[pathParts.length - 1];
    if (value === null) {
      delete current[finalKey];
    } else {
      current[finalKey] = value;
    }
    if (hlc) {
      current[`__hlc_${finalKey}`] = hlc;
    }
    if (pos) {
      current[`__pos_${finalKey}`] = pos;
    }
  }
  storeVersionVector(surfaceId, versions) {
    const dataModel = this.dataModels.get(surfaceId);
    if (dataModel) {
      dataModel.__versions = versions;
    }
  }
  updateComponentsWithData(surfaceId) {
    const surface = this.surfaces.get(surfaceId);
    if (!surface) {
      console.warn(`⚠️ Cannot update components with data, surface not found: ${surfaceId}`);
      return;
    }
    const dataModel = this.dataModels.get(surfaceId);
    if (!dataModel) {
      console.warn(`⚠️ No data model found for surface: ${surfaceId}`);
      return;
    }
    console.log(`🔄 Updating data-bound components for surface: ${surfaceId}`);
    const textNodes = surface.querySelectorAll("[data-binding-text-path]");
    textNodes.forEach((node) => {
      const path = node.dataset.bindingTextPath;
      if (!path) return;
      try {
        const value = this.propertyResolver.resolveValue({ path }, surfaceId);
        node.textContent = (value ?? "").toString();
      } catch (error) {
        console.error(`❌ Failed to update text binding for path ${path}:`, error);
      }
    });
    const imageNodes = surface.querySelectorAll("[data-binding-url-path]");
    imageNodes.forEach((node) => {
      const path = node.dataset.bindingUrlPath;
      if (!path) return;
      try {
        const value = this.propertyResolver.resolveValue({ path }, surfaceId);
        if (typeof value === "string") {
          node.src = value;
        }
      } catch (error) {
        console.error(`❌ Failed to update image url binding for path ${path}:`, error);
      }
    });
    const iconNodes = surface.querySelectorAll("[data-binding-icon-name-path]");
    iconNodes.forEach((node) => {
      const path = node.dataset.bindingIconNamePath;
      if (!path) return;
      try {
        const value = this.propertyResolver.resolveValue({ path }, surfaceId);
        if (typeof value === "string") {
          node.classList.forEach((cls) => {
            if (cls.startsWith("icon-")) {
              node.classList.remove(cls);
            }
          });
          node.classList.add(`icon-${value}`);
        }
      } catch (error) {
        console.error(`❌ Failed to update icon name binding for path ${path}:`, error);
      }
    });
    const listNodes = surface.querySelectorAll("[data-binding-list-path][data-template-component-id]");
    listNodes.forEach((listNode) => {
      const listPath = listNode.dataset.bindingListPath;
      const templateId = listNode.dataset.templateComponentId;
      if (!listPath || !templateId) return;
      const templateElement = this.componentElements.get(templateId);
      if (!templateElement) {
        console.warn(`⚠️ Template component not found for List: ${templateId}`);
        return;
      }
      const items = this.propertyResolver.resolveValue({ path: listPath }, surfaceId);
      if (!Array.isArray(items)) {
        return;
      }
      listNode.innerHTML = "";
      items.forEach((item, index) => {
        const clone = templateElement.cloneNode(true);
        clone.setAttribute("data-template-index", index.toString());
        clone.setAttribute("data-list-item", JSON.stringify(item));
        const buttons = clone.querySelectorAll("[data-component-id]");
        buttons.forEach((button) => {
          if (button.classList.contains("a2ui-button")) {
            button.dataset.listItemData = JSON.stringify(item);
            console.log(`📦 Injected item data into button at index ${index}:`, item);
          }
        });
        listNode.appendChild(clone);
      });
    });
  }
}

class A2UIRenderer {
  container;
  surfaces = /* @__PURE__ */ new Map();
  dataModels = /* @__PURE__ */ new Map();
  componentElements = /* @__PURE__ */ new Map();
  rootComponents = /* @__PURE__ */ new Map();
  propertyResolver;
  componentFactory;
  messageHandlers;
  actionHandler;
  constructor(container, actionHandler) {
    this.container = container;
    this.actionHandler = actionHandler;
    this.propertyResolver = new PropertyResolver(this.dataModels);
    this.componentFactory = new ComponentFactory(this.propertyResolver, this.componentElements, this.handleAction.bind(this));
    this.messageHandlers = new MessageHandlers(
      this.container,
      this.surfaces,
      this.dataModels,
      this.componentElements,
      this.rootComponents,
      this.componentFactory,
      this.propertyResolver
    );
  }
  /**
   * Handle component action (e.g., button click)
   */
  handleAction(action) {
    if (this.actionHandler) {
      this.actionHandler(action);
    } else {
      const event = new CustomEvent("a2ui:action", {
        detail: action
      });
      document.dispatchEvent(event);
    }
  }
  /**
   * Process A2UI v0.9 standard messages
   */
  processMessage(message) {
    if ("createSurface" in message) {
      this.messageHandlers.handleCreateSurface(message.createSurface);
    } else if ("updateComponents" in message) {
      this.messageHandlers.handleUpdateComponents(message.updateComponents);
    } else if ("updateDataModel" in message) {
      this.messageHandlers.handleUpdateDataModel(message.updateDataModel);
    } else if ("deleteSurface" in message) {
      this.messageHandlers.handleDeleteSurface(message.deleteSurface);
    } else {
      if ("beginRendering" in message) {
        console.warn("⚠️ Using deprecated beginRendering, consider upgrading to createSurface");
        this.messageHandlers.handleBeginRendering(message.beginRendering);
      } else if ("surfaceUpdate" in message) {
        console.warn("⚠️ Using deprecated surfaceUpdate, consider upgrading to updateComponents");
        this.messageHandlers.handleSurfaceUpdate(message.surfaceUpdate);
      } else if ("dataModelUpdate" in message) {
        console.warn("⚠️ Using legacy dataModelUpdate format");
        const legacyData = message.dataModelUpdate;
        const v09Data = {
          surfaceId: legacyData.surfaceId,
          actorId: "legacy-agent",
          updates: [{
            path: legacyData.path || "/",
            value: legacyData.contents,
            hlc: (/* @__PURE__ */ new Date()).toISOString() + ":1:legacy-agent"
          }],
          versions: {
            "legacy-agent": (/* @__PURE__ */ new Date()).toISOString() + ":1:legacy-agent"
          }
        };
        this.messageHandlers.handleUpdateDataModel(v09Data);
      }
    }
  }
  /**
   * Process multiple messages (typical A2UI response format)
   */
  processMessages(messages) {
    messages.forEach((message) => {
      try {
        this.processMessage(message);
      } catch (error) {
        console.error("❌ Failed to process A2UI message:", error, message);
      }
    });
  }
  /**
   * Clear all content
   */
  clear() {
    this.container.innerHTML = "";
    this.surfaces.clear();
    this.dataModels.clear();
    this.componentElements.clear();
    this.rootComponents.clear();
  }
  /**
   * Get current surfaces (for debugging)
   */
  getSurfaces() {
    return this.surfaces;
  }
  /**
   * Get current data models (for debugging)
   */
  getDataModels() {
    return this.dataModels;
  }
  /**
   * Validate A2UI message format (basic validation)
   */
  static validateMessage(message) {
    if (!message || typeof message !== "object") {
      return false;
    }
    const validMessageTypes = ["createSurface", "updateComponents", "updateDataModel", "deleteSurface"];
    const messageKeys = Object.keys(message);
    if (messageKeys.length !== 1) {
      return false;
    }
    const messageType = messageKeys[0];
    if (!validMessageTypes.includes(messageType)) {
      const legacyTypes = ["beginRendering", "surfaceUpdate", "dataModelUpdate"];
      return legacyTypes.includes(messageType);
    }
    return true;
  }
  /**
   * Generate HLC timestamp for data updates
   */
  static generateHLC(actorId = "client") {
    const timestamp = (/* @__PURE__ */ new Date()).toISOString();
    const counter = Math.floor(Math.random() * 1e3);
    return `${timestamp}:${counter}:${actorId}`;
  }
}

const ChatMessages = ({ messages, status, onSendMessage }) => {
  const messagesEndRef = useRef(null);
  const containerRef = useRef(null);
  const scrollToBottom = () => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  };
  useEffect(() => {
    scrollToBottom();
  }, [messages.length]);
  useEffect(() => {
    if (status === "ready") {
      setTimeout(() => {
        scrollToBottom();
      }, 100);
    }
  }, [status]);
  return /* @__PURE__ */ jsx("div", { ref: containerRef, className: "chat-container", children: /* @__PURE__ */ jsxs("div", { className: "chat-messages", children: [
    messages.length === 0 && /* @__PURE__ */ jsxs("div", { className: "welcome-message", children: [
      /* @__PURE__ */ jsx("h2", { children: "👋 Welcome to A2UI Chat" }),
      /* @__PURE__ */ jsx("p", { children: `Hi! I'm your AI assistant. Ask me anything or try typing keywords like "profile", "products" to see UI components.` })
    ] }),
    messages.map((message, index) => {
      const isLastMessage = index === messages.length - 1;
      const isStreaming = status === "streaming" && isLastMessage && message.role === "assistant";
      return /* @__PURE__ */ jsxs("div", { className: `message ${message.role === "user" ? "user" : "ai"}-message`, children: [
        /* @__PURE__ */ jsx("div", { className: "message-avatar", children: message.role === "user" ? /* @__PURE__ */ jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "currentColor", children: [
          /* @__PURE__ */ jsx("circle", { cx: "12", cy: "12", r: "11", fill: "rgba(255, 255, 255, 0.1)", stroke: "currentColor", strokeWidth: "1" }),
          /* @__PURE__ */ jsx("path", { d: "M12 5c1.8 0 3.2 1.4 3.2 3.2S13.8 11.4 12 11.4s-3.2-1.4-3.2-3.2S10.2 5 12 5zm0 7.2c2.4 0 7.2 1.2 7.2 3.6v1.4c0 0.4-0.4 0.8-0.8 0.8H5.6c-0.4 0-0.8-0.4-0.8-0.8v-1.4c0-2.4 4.8-3.6 7.2-3.6z" })
        ] }) : /* @__PURE__ */ jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "currentColor", children: [
          /* @__PURE__ */ jsx("circle", { cx: "12", cy: "12", r: "11", fill: "rgba(255, 255, 255, 0.1)", stroke: "currentColor", strokeWidth: "1" }),
          /* @__PURE__ */ jsx("path", { d: "M12 3.5l2.32 4.69L20 9.27l-4 3.9 0.94 5.48L12 16.23l-4.94 2.42L8 13.17 4 9.27l5.68-1.08L12 3.5z" })
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "message-content a2ui-message-content", style: {
          flex: "1 1 auto",
          minWidth: 0,
          maxWidth: "100%",
          padding: 0,
          lineHeight: 1.5,
          wordWrap: "break-word",
          overflowWrap: "break-word",
          display: "block",
          background: "transparent",
          border: "none"
        }, children: /* @__PURE__ */ jsx(
          MessageContent,
          {
            message,
            isStreaming,
            onSendMessage
          }
        ) })
      ] }, message.id);
    }),
    /* @__PURE__ */ jsx("div", { ref: messagesEndRef })
  ] }) });
};
const MessageContent = ({ message, isStreaming, onSendMessage }) => {
  const contentRef = useRef(null);
  const rendererRef = useRef(null);
  const textContent = message.parts ? message.parts.filter((part) => part.type === "text").map((part) => part.text).join("") : message.content || "";
  const isA2UIContent = (content) => {
    const jsonArrayMatch = content.match(/\[\s*\{[\s\S]*\}\s*\]/);
    if (jsonArrayMatch) {
      const jsonStr = jsonArrayMatch[0];
      try {
        const parsed = JSON.parse(jsonStr);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const hasA2UIStructure = parsed.some(
            (msg) => msg.createSurface || msg.updateComponents || msg.updateDataModel || msg.beginRendering || msg.surfaceUpdate || msg.dataModelUpdate
            // backward compatibility
          );
          return hasA2UIStructure;
        }
      } catch (e) {
      }
    }
    const trimmed = content.trim();
    if (trimmed.startsWith("[") && trimmed.endsWith("]")) {
      try {
        const parsed = JSON.parse(trimmed);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const hasA2UIStructure = parsed.some(
            (msg) => msg.createSurface || msg.updateComponents || msg.updateDataModel || msg.beginRendering || msg.surfaceUpdate || msg.dataModelUpdate
            // backward compatibility
          );
          return hasA2UIStructure;
        }
      } catch (e) {
      }
    }
    if (trimmed.startsWith("{") && trimmed.endsWith("}")) {
      try {
        const parsed = JSON.parse(trimmed);
        if (parsed.createSurface || parsed.updateComponents || parsed.updateDataModel) {
          console.warn("⚠️ Detected A2UI-like structure but in wrong format (single object instead of array)");
          return true;
        }
      } catch (e) {
      }
    }
    if (content.includes("---a2ui_JSON---")) {
      return true;
    }
    return false;
  };
  const parseA2UIResponse = (content) => {
    const jsonArrayMatch = content.match(/\[\s*\{[\s\S]*\}\s*\]/);
    if (jsonArrayMatch) {
      const jsonStr = jsonArrayMatch[0];
      try {
        const a2uiMessages = JSON.parse(jsonStr);
        const beforeJson = content.substring(0, content.indexOf(jsonStr)).trim();
        const textPart = beforeJson.length > 0 ? beforeJson : "";
        return {
          textPart: textPart.length > 100 ? textPart.substring(0, 100) + "..." : textPart,
          a2uiMessages: Array.isArray(a2uiMessages) ? a2uiMessages : [],
          error: null
        };
      } catch (error) {
        console.error("❌ Failed to parse JSON array:", error);
        return { textPart: "Failed to parse UI data", a2uiMessages: [], error: "parse_error" };
      }
    }
    const trimmed = content.trim();
    if (trimmed.startsWith("[") && trimmed.endsWith("]")) {
      return parseJSONPart(trimmed, "");
    }
    if (trimmed.startsWith("{") && trimmed.endsWith("}")) {
      try {
        const parsed = JSON.parse(trimmed);
        if (parsed.createSurface || parsed.updateComponents || parsed.updateDataModel) {
          console.warn("⚠️ AI returned wrong format: single object instead of message array");
          return {
            textPart: "",
            a2uiMessages: [],
            error: "wrong_format",
            originalContent: content
          };
        }
      } catch (e) {
      }
    }
    if (content.includes("---a2ui_JSON---")) {
      const parts = content.split("---a2ui_JSON---");
      if (parts.length !== 2) {
        return { textPart: content, a2uiMessages: [], error: null };
      }
      let textPart = parts[0].trim();
      let jsonPart = parts[1].trim();
      const lines = textPart.split("\n").filter((line) => line.trim());
      if (lines.length > 0) {
        textPart = lines[0];
      }
      const startIndex = jsonPart.indexOf("[");
      const endIndex = jsonPart.lastIndexOf("]");
      if (startIndex === -1 || endIndex === -1 || startIndex >= endIndex) {
        console.error("❌ No valid JSON array found");
        return { textPart: textPart || "UI generated!", a2uiMessages: [], error: null };
      }
      jsonPart = jsonPart.substring(startIndex, endIndex + 1);
      return parseJSONPart(jsonPart, textPart);
    }
    return { textPart: content, a2uiMessages: [], error: null };
  };
  const parseJSONPart = (jsonPart, textPart = "") => {
    try {
      const a2uiMessages = JSON.parse(jsonPart);
      return {
        textPart: textPart.length > 100 ? textPart.substring(0, 100) + "..." : textPart,
        a2uiMessages: Array.isArray(a2uiMessages) ? a2uiMessages : [],
        error: null
      };
    } catch (error) {
      console.error("❌ Failed to parse A2UI JSON:", error);
      console.error("📄 Problematic JSON:", jsonPart);
      try {
        let fixedJson = jsonPart.replace(/,\s*}/g, "}").replace(/,\s*]/g, "]").replace(/'/g, '"').replace(/(\w+):/g, '"$1":');
        const a2uiMessages = JSON.parse(fixedJson);
        return {
          textPart: textPart || "UI generated!",
          a2uiMessages: Array.isArray(a2uiMessages) ? a2uiMessages : [],
          error: null
        };
      } catch (fixError) {
        console.error("❌ JSON fix attempt failed:", fixError);
        return { textPart: textPart || "UI generated!", a2uiMessages: [], error: "parse_error" };
      }
    }
  };
  const handleAction = useCallback((a2uiActionMessage) => {
    if (!onSendMessage) {
      console.warn("⚠️ onSendMessage not available, action will be ignored");
      return;
    }
    if (!a2uiActionMessage.action) {
      console.warn("⚠️ Invalid A2UI action message format");
      return;
    }
    const messageText = JSON.stringify(a2uiActionMessage);
    onSendMessage({ text: messageText }).catch((error) => {
      console.error("❌ Failed to send action message:", error);
    });
  }, [onSendMessage]);
  useEffect(() => {
    if (contentRef.current && !rendererRef.current) {
      rendererRef.current = new A2UIRenderer(contentRef.current, handleAction);
    }
  }, [contentRef.current, handleAction]);
  useEffect(() => {
    if (contentRef.current && !rendererRef.current) {
      rendererRef.current = new A2UIRenderer(contentRef.current, handleAction);
    }
    if (rendererRef.current && textContent && !isStreaming) {
      if (contentRef.current) {
        contentRef.current.innerHTML = "";
      }
      const isA2UI = isA2UIContent(textContent);
      if (isA2UI) {
        const { textPart, a2uiMessages, error, originalContent } = parseA2UIResponse(textContent);
        if (error === "wrong_format") {
          console.error("❌ AI returned wrong A2UI format (single object instead of message array)");
          if (contentRef.current) {
            contentRef.current.innerHTML = `
              <div style="padding: 16px; background: rgba(255,165,0,0.15); border: 1px solid rgba(255,165,0,0.3); border-radius: 8px; color: white; margin-bottom: 12px;">
                <div style="font-weight: 600; margin-bottom: 8px; color: #ffa500;">⚠️ Format Error</div>
                <div style="font-size: 0.9em; margin-bottom: 12px; opacity: 0.9;">
                  AI returned A2UI-like content but in wrong format. Expected message array format, got single object.
                </div>
                <details style="margin-top: 12px;">
                  <summary style="cursor: pointer; font-size: 0.85em; opacity: 0.8;">Show raw response</summary>
                  <pre style="margin-top: 8px; padding: 12px; background: rgba(0,0,0,0.3); border-radius: 6px; overflow-x: auto; font-size: 0.75em; line-height: 1.4;">${JSON.stringify(originalContent ? JSON.parse(originalContent) : textContent, null, 2)}</pre>
                </details>
              </div>
            `;
          }
          return;
        }
        if (textPart && textPart.trim() && contentRef.current) {
          const textDiv = document.createElement("div");
          if (textDiv) {
            textDiv.style.cssText = "padding: 8px 12px; background: rgba(255,255,255,0.05); border-radius: 6px; color: rgba(255,255,255,0.7); margin-bottom: 12px; font-size: 0.9em;";
            if (typeof textDiv.textContent !== "undefined") {
              textDiv.textContent = textPart;
            } else {
              console.error("❌ textDiv.textContent is undefined");
            }
            contentRef.current.appendChild(textDiv);
          } else {
            console.error("❌ Failed to create textDiv element");
          }
        }
        if (a2uiMessages.length > 0) {
          try {
            a2uiMessages.forEach((msg) => {
              rendererRef.current?.processMessage(msg);
            });
          } catch (error2) {
            console.error("❌ Error processing A2UI messages:", error2);
            if (contentRef.current) {
              contentRef.current.innerHTML = `<div style="padding: 12px; background: rgba(255,0,0,0.1); border-radius: 8px; color: white;">❌ Error rendering UI: ${error2}</div>`;
            }
          }
        } else {
          console.warn("⚠️ No A2UI messages found in parsed content");
          if (contentRef.current) {
            contentRef.current.innerHTML = `<div style="padding: 12px; background: rgba(255,255,255,0.1); border-radius: 8px; color: white;">${textContent}</div>`;
          }
        }
      } else {
        if (contentRef.current) {
          contentRef.current.innerHTML = `<div style="padding: 12px; background: rgba(255,255,255,0.1); border-radius: 8px; color: white;">${textContent}</div>`;
        }
      }
    } else if (!isStreaming && textContent) {
      if (contentRef.current) {
        contentRef.current.innerHTML = `<div style="padding: 12px; background: rgba(255,255,255,0.1); border-radius: 8px; color: white;">${textContent}</div>`;
      }
    }
  }, [textContent, message.id, isStreaming]);
  if (isStreaming) {
    return /* @__PURE__ */ jsx("div", { style: {
      padding: "12px",
      background: "rgba(255,255,255,0.1)",
      borderRadius: "8px",
      color: "white",
      display: "flex",
      alignItems: "center",
      gap: "8px"
    }, children: /* @__PURE__ */ jsx(LoadingDots, {}) });
  }
  return /* @__PURE__ */ jsx("div", { ref: contentRef });
};
const LoadingDots = () => {
  return /* @__PURE__ */ jsx("div", { className: "loading-dots", style: {
    display: "flex",
    gap: "4px",
    alignItems: "center"
  }, children: [0, 1, 2].map((i) => /* @__PURE__ */ jsx(
    "div",
    {
      className: "loading-dot",
      style: {
        width: "6px",
        height: "6px",
        borderRadius: "50%",
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        animation: `loadingDot 1.4s ease-in-out ${i * 0.16}s infinite both`
      }
    },
    i
  )) });
};

const ChatInput = ({ onSendMessage, disabled = false }) => {
  const [message, setMessage] = useState("");
  const textareaRef = useRef(null);
  const containerRef = useRef(null);
  const sendingRef = useRef(false);
  const adjustHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 200) + "px";
    }
  };
  useEffect(() => {
    adjustHeight();
  }, [message]);
  const handleSend = () => {
    const trimmedMessage = message.trim();
    if (!trimmedMessage || disabled || sendingRef.current) {
      return;
    }
    sendingRef.current = true;
    onSendMessage(trimmedMessage);
    setMessage("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
    setTimeout(() => {
      sendingRef.current = false;
    }, 1e3);
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };
  const handleContainerClick = (e) => {
    if (e.target !== e.currentTarget) return;
    textareaRef.current?.focus();
  };
  return /* @__PURE__ */ jsx("div", { className: "chat-input-wrapper", children: /* @__PURE__ */ jsxs(
    "div",
    {
      ref: containerRef,
      className: "chat-input-container",
      onClick: handleContainerClick,
      children: [
        /* @__PURE__ */ jsx(
          "textarea",
          {
            ref: textareaRef,
            className: "chat-input",
            placeholder: "Type your message here...",
            value: message,
            onChange: (e) => setMessage(e.target.value),
            onKeyDown: handleKeyDown,
            disabled: disabled || sendingRef.current,
            rows: 1
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            className: "send-button",
            onClick: handleSend,
            disabled: disabled || !message.trim() || sendingRef.current,
            children: /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ jsx("path", { d: "M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" }) })
          }
        )
      ]
    }
  ) });
};

const ChatPage = () => {
  const { messages, sendMessage, status } = useCustomChat();
  const handleSendMessage = async (messageText) => {
    await sendMessage({ text: messageText });
  };
  return /* @__PURE__ */ jsxs("main", { className: "chat-section", children: [
    /* @__PURE__ */ jsx("div", { className: "chat-background" }),
    /* @__PURE__ */ jsx(
      ChatMessages,
      {
        messages,
        status,
        onSendMessage: sendMessage
      }
    ),
    /* @__PURE__ */ jsx(
      ChatInput,
      {
        onSendMessage: handleSendMessage,
        disabled: status !== "ready"
      }
    )
  ] });
};

const $$Chat = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`<html lang="zh-CN"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>A2UI - AI Chat</title><!-- EdgeOne original resources (CSS only) -->${renderComponent($$result, "EvervaultHead", $$EvervaultHead, {})}${renderHead()}</head> <body> <!-- Original navigation bar --> ${renderComponent($$result, "OriginalHeader", $$OriginalHeader, {})} <!-- AI chat area - using React components --> ${renderComponent($$result, "ChatPage", ChatPage, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/Users/tomcomtang/VscodeProjects/video_fe/edgeone-pages-templates/a2ui-template/src/components/chat/ChatPage", "client:component-export": "default" })} </body></html>`;
}, "/Users/tomcomtang/VscodeProjects/video_fe/edgeone-pages-templates/a2ui-template/src/pages/chat.astro", void 0);

const $$file = "/Users/tomcomtang/VscodeProjects/video_fe/edgeone-pages-templates/a2ui-template/src/pages/chat.astro";
const $$url = "/chat";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Chat,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
