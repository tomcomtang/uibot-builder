import { convertToModelMessages } from 'ai';
import { GoogleGenAI, Type } from '@google/genai';
export { renderers } from '../../renderers.mjs';

const $schema = "https://json-schema.org/draft/2020-12/schema";
const $id = "https://a2ui.dev/specification/v0_9/complete_schema.json";
const title = "A2UI v0.9 Complete Schema for AI Generation";
const description = "Complete A2UI v0.9 schema for AI to generate structured UI messages. Always return JSON array format.";
const type = "array";
const minItems = 1;
const items = {"oneOf":[{"$ref":"#/$defs/CreateSurfaceMessage"},{"$ref":"#/$defs/UpdateComponentsMessage"},{"$ref":"#/$defs/UpdateDataModelMessage"},{"$ref":"#/$defs/DeleteSurfaceMessage"}]};
const $defs = {"CreateSurfaceMessage":{"type":"object","properties":{"createSurface":{"type":"object","properties":{"surfaceId":{"type":"string","description":"Unique identifier for the UI surface"},"catalogId":{"type":"string","description":"Catalog identifier - use 'standard-catalog'","default":"standard-catalog"}},"required":["surfaceId","catalogId"],"additionalProperties":false}},"required":["createSurface"],"additionalProperties":false},"UpdateComponentsMessage":{"type":"object","properties":{"updateComponents":{"type":"object","properties":{"surfaceId":{"type":"string","description":"Must match the surfaceId from createSurface"},"components":{"type":"array","description":"Array of UI components. Must include one component with id='root'","minItems":1,"items":{"$ref":"#/$defs/Component"}}},"required":["surfaceId","components"],"additionalProperties":false}},"required":["updateComponents"],"additionalProperties":false},"UpdateDataModelMessage":{"type":"object","properties":{"updateDataModel":{"type":"object","properties":{"surfaceId":{"type":"string"},"actorId":{"type":"string","default":"agent"},"updates":{"type":"array","items":{"type":"object","properties":{"path":{"type":"string"},"value":{},"hlc":{"type":"string"}},"required":["path","value","hlc"]}},"versions":{"type":"object","additionalProperties":{"type":"string"}}},"required":["surfaceId","actorId","updates","versions"]}},"required":["updateDataModel"],"additionalProperties":false},"DeleteSurfaceMessage":{"type":"object","properties":{"deleteSurface":{"type":"object","properties":{"surfaceId":{"type":"string"}},"required":["surfaceId"]}},"required":["deleteSurface"],"additionalProperties":false},"Component":{"type":"object","properties":{"id":{"type":"string","description":"Unique component identifier"},"component":{"type":"string","enum":["Text","Image","Icon","Video","AudioPlayer","Row","Column","List","Card","Divider","Button","TextField","CheckBox","ChoicePicker","Slider","DateTimeInput","Chart"]},"weight":{"type":"number","description":"Flex weight for layout (optional)"}},"required":["id","component"],"allOf":[{"if":{"properties":{"component":{"const":"Text"}}},"then":{"properties":{"text":{"oneOf":[{"type":"string"},{"$ref":"#/$defs/DynamicString"}],"description":"The text content to display. Use variant to specify the text style (h1-h5 for headings, body for regular text, caption for small text)."},"variant":{"type":"string","enum":["h1","h2","h3","h4","h5","caption","body"],"description":"A hint for the base text style. Use h1-h5 for headings/titles (h1 is largest, h5 is smallest). Use 'body' for regular paragraph text. Use 'caption' for small descriptive text. When displaying titles in cards or lists, prefer h3 or h4 for card titles, and 'body' for descriptions."}},"required":["text"]}},{"if":{"properties":{"component":{"const":"Image"}}},"then":{"properties":{"url":{"oneOf":[{"type":"string"},{"$ref":"#/$defs/DynamicString"}],"description":"Image URL"},"fit":{"type":"string","enum":["contain","cover","fill","none","scale-down"]},"variant":{"type":"string","enum":["icon","avatar","smallFeature","mediumFeature","largeFeature","header"]}},"required":["url"]}},{"if":{"properties":{"component":{"const":"Icon"}}},"then":{"properties":{"name":{"oneOf":[{"type":"string","enum":["accountCircle","add","arrowBack","arrowForward","attachFile","calendarToday","call","camera","check","close","delete","download","edit","event","error","fastForward","favorite","favoriteOff","folder","help","home","info","locationOn","lock","lockOpen","mail","menu","moreVert","moreHoriz","notificationsOff","notifications","pause","payment","person","phone","photo","play","print","refresh","rewind","search","send","settings","share","shoppingCart","skipNext","skipPrevious","star","starHalf","starOff","stop","upload","visibility","visibilityOff","volumeDown","volumeMute","volumeOff","volumeUp","warning"]},{"type":"object","properties":{"path":{"type":"string"}},"required":["path"]}]}},"required":["name"]}},{"if":{"properties":{"component":{"const":"Video"}}},"then":{"properties":{"url":{"oneOf":[{"type":"string"},{"$ref":"#/$defs/DynamicString"}]}},"required":["url"]}},{"if":{"properties":{"component":{"const":"AudioPlayer"}}},"then":{"properties":{"url":{"oneOf":[{"type":"string"},{"$ref":"#/$defs/DynamicString"}]},"description":{"oneOf":[{"type":"string"},{"$ref":"#/$defs/DynamicString"}]}},"required":["url"]}},{"if":{"properties":{"component":{"const":"Row"}}},"then":{"properties":{"children":{"type":"array","items":{"type":"string"},"description":"Array of child component IDs"},"justify":{"type":"string","enum":["center","end","spaceAround","spaceBetween","spaceEvenly","start","stretch"]},"align":{"type":"string","enum":["start","center","end","stretch"]}},"required":["children"]}},{"if":{"properties":{"component":{"const":"Column"}}},"then":{"properties":{"children":{"type":"array","items":{"type":"string"},"description":"Array of child component IDs"},"justify":{"type":"string","enum":["start","center","end","spaceBetween","spaceAround","spaceEvenly","stretch"]},"align":{"type":"string","enum":["center","end","start","stretch"]}},"required":["children"]}},{"if":{"properties":{"component":{"const":"List"}}},"then":{"properties":{"children":{"type":"array","items":{"type":"string"},"description":"Array of child component IDs"},"direction":{"type":"string","enum":["vertical","horizontal"],"default":"vertical"},"align":{"type":"string","enum":["start","center","end","stretch"]}},"required":["children"]}},{"if":{"properties":{"component":{"const":"Card"}}},"then":{"properties":{"children":{"type":"array","items":{"type":"string"},"description":"Array of child component IDs for card content"}},"required":["children"]}},{"if":{"properties":{"component":{"const":"Button"}}},"then":{"properties":{"children":{"type":"array","items":{"type":"string"},"description":"Array containing button content (usually Text or Icon component IDs)"},"primary":{"type":"boolean","description":"Whether this is a primary button (use true for main actions like 'View Details', 'Learn More', etc.)"},"action":{"type":"object","description":"The action to trigger when button is clicked. Use action.name='navigate' or 'viewDetails' for navigation actions. The action.context can contain additional data like item ID, title, etc. For 'View Details' or 'Learn More' buttons, use action.name='navigate' with context containing the item information.","properties":{"name":{"type":"string","description":"Action name. Common values: 'navigate' (for going to next level/details), 'viewDetails', 'learnMore', 'submit', etc. Use 'navigate' when the button should show more information or go to a detail page."},"context":{"type":"object","description":"Additional context data for the action. For navigation actions, include relevant information like item ID, title, description, etc. that will be sent to the AI to generate the next level content.","additionalProperties":true}},"required":["name"]}},"required":["children","action"]}},{"if":{"properties":{"component":{"const":"TextField"}}},"then":{"properties":{"label":{"oneOf":[{"type":"string"},{"$ref":"#/$defs/DynamicString"}]},"value":{"oneOf":[{"type":"string"},{"$ref":"#/$defs/DynamicString"}]},"variant":{"type":"string","enum":["longText","number","shortText","obscured"]}},"required":["label"]}},{"if":{"properties":{"component":{"const":"CheckBox"}}},"then":{"properties":{"label":{"oneOf":[{"type":"string"},{"$ref":"#/$defs/DynamicString"}]},"value":{"oneOf":[{"type":"boolean"},{"$ref":"#/$defs/DynamicBoolean"}]}},"required":["label","value"]}},{"if":{"properties":{"component":{"const":"Divider"}}},"then":{"properties":{"axis":{"type":"string","enum":["horizontal","vertical"],"default":"horizontal"}}}},{"if":{"properties":{"component":{"const":"Slider"}}},"then":{"properties":{"label":{"oneOf":[{"type":"string"},{"$ref":"#/$defs/DynamicString"}]},"min":{"type":"number"},"max":{"type":"number"},"value":{"oneOf":[{"type":"number"},{"$ref":"#/$defs/DynamicNumber"}]}},"required":["value","min","max"]}},{"if":{"properties":{"component":{"const":"DateTimeInput"}}},"then":{"properties":{"value":{"oneOf":[{"type":"string"},{"$ref":"#/$defs/DynamicString"}]},"enableDate":{"type":"boolean"},"enableTime":{"type":"boolean"},"label":{"oneOf":[{"type":"string"},{"$ref":"#/$defs/DynamicString"}]}}}},{"if":{"properties":{"component":{"const":"ChoicePicker"}}},"then":{"properties":{"label":{"oneOf":[{"type":"string"},{"$ref":"#/$defs/DynamicString"}]},"variant":{"type":"string","enum":["multipleSelection","mutuallyExclusive"]},"options":{"type":"array","items":{"type":"object","properties":{"label":{"oneOf":[{"type":"string"},{"$ref":"#/$defs/DynamicString"}]},"value":{"type":"string"}},"required":["label","value"]}},"value":{"oneOf":[{"type":"array","items":{"type":"string"}},{"$ref":"#/$defs/DynamicStringList"}]}},"required":["options","value"]}}],"additionalProperties":false},"DynamicString":{"type":"object","properties":{"literalString":{"type":"string"},"path":{"type":"string"}},"oneOf":[{"required":["literalString"]},{"required":["path"]}]},"DynamicBoolean":{"type":"object","properties":{"literalBoolean":{"type":"boolean"},"path":{"type":"string"}},"oneOf":[{"required":["literalBoolean"]},{"required":["path"]}]}};
const a2uiSchema = {
  $schema,
  $id,
  title,
  description,
  type,
  minItems,
  items,
  $defs,
};

const getA2UISchema = () => {
  return a2uiSchema;
};
const createA2UISystemPrompt = (a2uiSchema2) => {
  return `You are an A2UI v0.9 compliant UI generator. When the user requests to create, show, display, or build any UI interface, you MUST call the send_a2ui_json_to_client function.

## CRITICAL: When to Use A2UI
If the user asks to:
- create, make, build, show, display any UI, website, page, interface, card, button, form
- show rankings, lists, top items

You MUST call the send_a2ui_json_to_client function. DO NOT respond with plain text.

## CRITICAL: Response Format
You MUST call the send_a2ui_json_to_client function with a valid A2UI JSON array. Each message in the array is an object with exactly ONE key: createSurface, updateComponents, updateDataModel, or deleteSurface.

## A2UI JSON Schema Reference:
---BEGIN A2UI JSON SCHEMA---
${JSON.stringify(a2uiSchema2, null, 2)}
---END A2UI JSON SCHEMA---

## IMPORTANT RULES:
1. ALWAYS return a JSON array, not a single object
2. createSurface MUST have "surfaceId" (not "id") and "catalogId" (use "standard-catalog")
3. updateComponents MUST be an object with "surfaceId" and "components" array (not a direct array)
4. Components MUST use "component" field (not "type"), and properties directly (not in "props" object)
5. Component "id" field is REQUIRED
6. Component "children" is an array of component IDs (strings), not nested objects
7. Text component uses "text" and "variant" (h1, h2, h3, h4, h5, body, caption)
8. Row/Column use "justify" and "align" properties (not "justifyContent", "alignItems")
9. Button uses "action" object, not "actions" array
10. One component MUST have id="root"

## COMPONENT USAGE GUIDELINES:
- Use Card component to group related content (images, text, buttons) together. Cards provide visual separation and structure.
- Use Row component to arrange items horizontally (e.g., multiple cards side by side, buttons in a row).
- Use Column component to arrange items vertically (e.g., stacking cards, vertical lists).
- When showing multiple items (like buildings, products, etc.), wrap each item in a Card, then place Cards in a Row.
- Example structure for displaying multiple items:
  * Root: Column (vertical layout)
    * Row (horizontal layout for multiple items)
      * Card (item 1: Image + Text + Button)
      * Card (item 2: Image + Text + Button)
      * Card (item 3: Image + Text + Button)

## CHART COMPONENT GUIDELINES:
- Use Chart component to display data visualizations (line charts, bar charts, pie charts, etc.)
- Chart data format:
  * For line/bar charts: data array with [{x: 'Label', y: number}] or [{label: 'Label', value: number}]
  * For pie/doughnut charts: data array with [{label: 'Label', value: number}]
  * For radar/polarArea charts: data array with [{label: 'Label', value: number}]
- Chart types: 'line' (line chart), 'bar' (bar chart), 'pie' (pie chart), 'doughnut' (doughnut chart), 'radar' (radar chart), 'polarArea' (polar area chart)
- Always provide a title for the chart to help users understand what data is being displayed
- For line/bar charts, provide xLabel and yLabel to describe the axes
- Example Chart component:
  {
    "id": "sales_chart",
    "component": "Chart",
    "type": "bar",
    "title": "Monthly Sales",
    "xLabel": "Month",
    "yLabel": "Sales ($)",
    "data": [
      {"x": "Jan", "y": 1000},
      {"x": "Feb", "y": 1500},
      {"x": "Mar", "y": 1200}
    ]
  }

## IMAGE URL GUIDELINES:
- When using Image components, ONLY use URLs from reliable sources that are likely to exist:
  * Wikimedia Commons: https://upload.wikimedia.org/wikipedia/commons/...
  * Unsplash: https://images.unsplash.com/... or https://unsplash.com/photos/...
  * Pexels: https://images.pexels.com/...
  * Placeholder services: https://via.placeholder.com/... or https://picsum.photos/...
- DO NOT use URLs from:
  * Random websites you don't know exist
  * URLs that might be outdated or broken
  * URLs from your training data that you're not certain are still valid
- If you cannot find a reliable image URL, you can omit the Image component and use only Text components to describe the item.
- When in doubt about image availability, prefer text-only content over potentially broken image URLs.

## For non-UI requests (general questions, explanations), respond with normal text only.`;
};
const isUIRequest = (messageText) => {
  if (/create|make|build|show|card|button|form|website|page|interface|top|richest|ranking|list/.test(messageText.toLowerCase())) {
    return true;
  }
  if (messageText.trim().startsWith("{") && messageText.includes('"action"')) {
    try {
      const parsed = JSON.parse(messageText.trim());
      if (parsed.action && parsed.action.name && parsed.action.surfaceId && parsed.action.sourceComponentId) {
        return true;
      }
    } catch (e) {
    }
  }
  if (messageText.includes("A2UI Action:") || messageText.includes('"action"')) {
    try {
      const actionMatch = messageText.match(/A2UI Action:\s*(\{[\s\S]*\})/);
      if (actionMatch) {
        const actionJson = JSON.parse(actionMatch[1]);
        if (actionJson.action && actionJson.action.name) {
          return true;
        }
      }
    } catch (e) {
    }
  }
  return false;
};
const isA2UIJSON = (content) => {
  if (!content || typeof content !== "string") return false;
  const trimmed = content.trim();
  if (trimmed.startsWith("[") && trimmed.endsWith("]")) {
    try {
      const parsed = JSON.parse(trimmed);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed.some(
          (msg) => msg.createSurface || msg.updateComponents || msg.updateDataModel || msg.deleteSurface || msg.beginRendering || msg.surfaceUpdate || msg.dataModelUpdate
          // backward compatibility
        );
      }
    } catch (e) {
    }
  }
  const jsonArrayMatch = content.match(/\[\s*\{[\s\S]*\}\s*\]/);
  if (jsonArrayMatch) {
    try {
      const parsed = JSON.parse(jsonArrayMatch[0]);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed.some(
          (msg) => msg.createSurface || msg.updateComponents || msg.updateDataModel || msg.deleteSurface
        );
      }
    } catch (e) {
    }
  }
  return false;
};
const validateA2UIJSON = (jsonStr, _schema) => {
  try {
    let parsed;
    try {
      parsed = JSON.parse(jsonStr);
    } catch (parseError) {
      console.error("JSON parse error:", parseError.message);
      throw new Error(`Invalid JSON string: ${parseError.message}`);
    }
    if (typeof parsed === "object" && parsed !== null && !Array.isArray(parsed) && parsed.a2ui_json) {
      try {
        parsed = typeof parsed.a2ui_json === "string" ? JSON.parse(parsed.a2ui_json) : parsed.a2ui_json;
      } catch (e) {
        console.error("Failed to parse a2ui_json field:", e);
        throw new Error("Failed to parse a2ui_json field");
      }
    }
    if (!Array.isArray(parsed)) {
      console.error("Parsed result is not an array:", typeof parsed, parsed);
      throw new Error(`A2UI JSON must be an array of messages, got ${typeof parsed}`);
    }
    const hasA2UIStructure = parsed.some(
      (msg) => msg.createSurface || msg.updateComponents || msg.updateDataModel || msg.deleteSurface
    );
    if (!hasA2UIStructure) {
      console.error("No valid A2UI message structure found in array");
      throw new Error("No valid A2UI message structure found");
    }
    return parsed;
  } catch (error) {
    console.error("Validation error:", error);
    throw new Error(`Invalid A2UI JSON: ${error.message || error}`);
  }
};
const getCORSHeaders = (origin) => {
  const allowedOrigins = [
    "https://uibot-builder.edgeone.cool",
    "http://localhost:4321",
    "http://localhost:3000"
  ];
  const requestOrigin = origin || "";
  const allowOrigin = allowedOrigins.includes(requestOrigin) ? requestOrigin : allowedOrigins[0];
  return {
    "Access-Control-Allow-Origin": allowOrigin,
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Max-Age": "86400"
  };
};
const OPTIONS = async ({ request }) => {
  const origin = request.headers.get("Origin");
  return new Response(null, {
    status: 204,
    headers: getCORSHeaders(origin)
  });
};
const POST = async ({ request }) => {
  const origin = request.headers.get("Origin");
  const corsHeaders = getCORSHeaders(origin);
  try {
    const { messages } = await request.json();
    const modelMessages = await convertToModelMessages(messages);
    const lastMessage = messages[messages.length - 1];
    const lastMessageText = lastMessage?.parts?.filter((part) => part.type === "text")?.map((part) => part.text)?.join("") || "";
    const isUI = isUIRequest(lastMessageText);
    const apiKey = process.env.GEMINI_API_KEY || process.env.Gemini_Api_Key || process.env.GEMINI_API_KEY_ENV || "AIzaSyBJfyCwuhBa_yfTEzbZpRolCM62CFMbqXY";
    if (!apiKey) ;
    const genAI = new GoogleGenAI({ apiKey });
    const apiMessages = [];
    if (isUI) {
      const a2uiSchema2 = getA2UISchema();
      const systemPrompt = createA2UISystemPrompt(a2uiSchema2);
      modelMessages.slice(0, -1).forEach((msg) => {
        if (msg.role === "user" || msg.role === "assistant" || msg.role === "model") {
          let msgContent = "";
          if (typeof msg.content === "string") {
            msgContent = msg.content;
          } else if (Array.isArray(msg.content)) {
            const textPart = msg.content.find((part) => part.type === "text");
            msgContent = textPart?.text || "";
          }
          if (msgContent && isA2UIJSON(msgContent)) {
            return;
          }
          if (msgContent) {
            const geminiRole = msg.role === "assistant" || msg.role === "model" ? "model" : "user";
            apiMessages.push({
              role: geminiRole,
              parts: [{ text: msgContent }]
            });
          }
        } else {
          console.warn(`⚠️ Skipping message with unknown role: ${msg.role}`);
        }
      });
      const currentUserMsg = modelMessages[modelMessages.length - 1];
      if (currentUserMsg && currentUserMsg.role === "user") {
        let userContent = "";
        if (typeof currentUserMsg.content === "string") {
          userContent = currentUserMsg.content;
        } else if (Array.isArray(currentUserMsg.content)) {
          const textPart = currentUserMsg.content.find((part) => part.type === "text");
          userContent = textPart?.text || "";
        }
        if (userContent) {
          apiMessages.push({
            role: "user",
            parts: [{ text: userContent }]
          });
        }
      }
      const tools = [
        {
          functionDeclarations: [
            {
              name: "send_a2ui_json_to_client",
              description: "Sends A2UI JSON to the client to render rich UI for the user. This tool can be called multiple times in the same call to render multiple UI surfaces. Args: a2ui_json: Valid A2UI JSON Schema to send to the client. The A2UI JSON Schema definition is between ---BEGIN A2UI JSON SCHEMA--- and ---END A2UI JSON SCHEMA--- in the system instructions.",
              parameters: {
                type: Type.OBJECT,
                properties: {
                  a2ui_json: {
                    type: Type.STRING,
                    description: "valid A2UI JSON Schema to send to the client."
                  }
                },
                required: ["a2ui_json"]
              }
            }
          ]
        }
      ];
      const invalidMessages = apiMessages.filter((m) => m.role !== "user" && m.role !== "model");
      if (invalidMessages.length > 0) {
        console.error("❌ Invalid message roles found:", invalidMessages);
        throw new Error(`Invalid message roles: ${invalidMessages.map((m) => m.role).join(", ")}. Only 'user' and 'model' are allowed.`);
      }
      const model = genAI.models.generateContent({
        model: "gemini-2.5-flash",
        contents: apiMessages,
        config: {
          systemInstruction: systemPrompt,
          temperature: 0.05,
          tools
        }
      });
      const response = await model;
      const candidates = response.candidates;
      if (!candidates || candidates.length === 0) {
        throw new Error("No candidates in response");
      }
      const candidate = candidates[0];
      const functionCalls = candidate.content?.parts?.filter((part) => part.functionCall) || [];
      if (functionCalls.length > 0) {
        const a2uiFunctionCall = functionCalls.find(
          (fc) => fc.functionCall?.name === "send_a2ui_json_to_client"
        );
        if (a2uiFunctionCall?.functionCall?.args?.a2ui_json) {
          const a2uiJsonStr = a2uiFunctionCall.functionCall.args.a2ui_json;
          const a2uiMessages = validateA2UIJSON(String(a2uiJsonStr), a2uiSchema2);
          const finalContent = JSON.stringify(a2uiMessages);
          return new Response(
            `0:${JSON.stringify({ type: "text", text: finalContent })}
`,
            {
              headers: {
                "Content-Type": "text/plain; charset=utf-8",
                ...corsHeaders
              }
            }
          );
        }
      }
      const textContent = candidate.content?.parts?.filter((part) => part.text)?.map((part) => part.text)?.join("") || "";
      return new Response(
        `0:${JSON.stringify({ type: "text", text: textContent })}
`,
        {
          headers: {
            "Content-Type": "text/plain; charset=utf-8",
            ...corsHeaders
          }
        }
      );
    } else {
      modelMessages.forEach((msg) => {
        if (msg.role === "user" || msg.role === "assistant" || msg.role === "model") {
          let msgContent = "";
          if (typeof msg.content === "string") {
            msgContent = msg.content;
          } else if (Array.isArray(msg.content)) {
            const textPart = msg.content.find((part) => part.type === "text");
            msgContent = textPart?.text || "";
          }
          if (msgContent && isA2UIJSON(msgContent)) {
            return;
          }
          if (msgContent) {
            const geminiRole = msg.role === "assistant" || msg.role === "model" ? "model" : "user";
            apiMessages.push({
              role: geminiRole,
              parts: [{ text: msgContent }]
            });
          }
        } else {
          console.warn(`⚠️ Skipping message with unknown role: ${msg.role}`);
        }
      });
      const invalidMessages = apiMessages.filter((m) => m.role !== "user" && m.role !== "model");
      if (invalidMessages.length > 0) {
        console.error("❌ Invalid message roles found:", invalidMessages);
        throw new Error(`Invalid message roles: ${invalidMessages.map((m) => m.role).join(", ")}. Only 'user' and 'model' are allowed.`);
      }
      const model = genAI.models.generateContent({
        model: "gemini-2.5-flash",
        contents: apiMessages,
        config: {
          temperature: 0.7
        }
      });
      const response = await model;
      const candidates = response.candidates;
      if (!candidates || candidates.length === 0) {
        throw new Error("No candidates in response");
      }
      const textContent = candidates[0].content?.parts?.filter((part) => part.text)?.map((part) => part.text)?.join("") || "";
      return new Response(
        `0:${JSON.stringify({ type: "text", text: textContent })}
`,
        {
          headers: {
            "Content-Type": "text/plain; charset=utf-8",
            ...corsHeaders
          }
        }
      );
    }
  } catch (error) {
    console.error("❌ Chat API error:", error);
    console.error("❌ Error stack:", error?.stack);
    console.error("❌ Error details:", JSON.stringify(error, Object.getOwnPropertyNames(error), 2));
    const apiError = error?.error || error?.response?.error || error;
    let apiErrorMessage = apiError?.message || error?.message || String(error);
    const apiErrorCode = apiError?.code || error?.status || error?.statusCode || 500;
    if (apiErrorMessage.includes("GEMINI_API_KEY")) {
      apiErrorMessage = "GEMINI_API_KEY not configured. Please set GEMINI_API_KEY in your EdgeOne Pages environment variables.";
    } else if (apiErrorMessage.includes("schema")) {
      apiErrorMessage = `Schema loading error: ${apiErrorMessage}. Please ensure a2ui-schema.json exists in src/lib/`;
    } else if (apiErrorMessage.includes("ENOENT")) {
      apiErrorMessage = `File not found: ${apiErrorMessage}. This might be a deployment issue.`;
    }
    let statusCode = 500;
    if (apiErrorCode === 403 || apiErrorCode === 401) {
      statusCode = 401;
    } else if (apiErrorCode === 400) {
      statusCode = 400;
    } else if (apiErrorCode === 429) {
      statusCode = 429;
    } else if (apiErrorCode === 503 || apiErrorCode === "UNAVAILABLE") {
      statusCode = 503;
    }
    let retryDelay;
    let quotaInfo;
    if (apiErrorCode === 429 || apiErrorMessage?.includes("quota") || apiErrorMessage?.includes("Quota exceeded")) {
      const retryInfo = apiError?.details?.find((d) => d["@type"]?.includes("RetryInfo"));
      if (retryInfo?.retryDelay) {
        retryDelay = parseInt(retryInfo.retryDelay) || void 0;
      }
      const quotaFailure = apiError?.details?.find((d) => d["@type"]?.includes("QuotaFailure"));
      if (quotaFailure?.violations?.[0]) {
        const violation = quotaFailure.violations[0];
        quotaInfo = `Limit: ${violation.quotaValue || "unknown"}, Metric: ${violation.quotaMetric || "unknown"}`;
      }
    } else if (apiErrorCode === 503 || apiErrorMessage?.includes("overloaded") || apiErrorMessage?.includes("UNAVAILABLE")) {
      const retryInfo = apiError?.details?.find((d) => d["@type"]?.includes("RetryInfo"));
      if (retryInfo?.retryDelay) {
        retryDelay = parseInt(retryInfo.retryDelay) || void 0;
      }
    }
    return new Response(JSON.stringify({
      error: "API Error",
      message: apiErrorMessage,
      // Return the actual error message
      details: {
        apiError,
        code: apiErrorCode,
        status: apiError?.status,
        fullError: error,
        // Include helpful info based on error type
        suggestion: apiErrorCode === 403 || apiErrorCode === 401 || apiErrorMessage?.includes("API key") ? "Please check your GEMINI_API_KEY at https://aistudio.google.com/" : apiErrorCode === 429 || apiErrorMessage?.includes("quota") ? `Quota exceeded. ${quotaInfo ? `(${quotaInfo})` : ""} ${retryDelay ? `Please retry in ${Math.ceil(retryDelay)} seconds.` : "Please wait and try again later."} Free tier limit: 20 requests per day. Upgrade at https://ai.google.dev/pricing` : apiErrorCode === 503 || apiErrorMessage?.includes("overloaded") || apiErrorMessage?.includes("UNAVAILABLE") ? `Service temporarily unavailable. The AI model is currently overloaded. ${retryDelay ? `Please retry in ${Math.ceil(retryDelay)} seconds.` : "Please wait a moment and try again."}` : void 0,
        retryDelay,
        quotaInfo
      }
    }), {
      status: statusCode,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders
      }
    });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  OPTIONS,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
