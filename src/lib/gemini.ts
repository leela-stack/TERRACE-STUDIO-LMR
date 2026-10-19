import { GoogleGenAI } from '@google/genai';

const apiKey = process.env.GEMINI_API_KEY;

export async function askGeminiShoppingAdvisor(params: {
  budgetInr: number;
  netSqFt: number;
  zoneName: string;
  weatherZone: string;
  executionTier: string;
}): Promise<string> {
  const prompt = `You are the Built-In AI CleanTech & Architecture Assistant for TERRACE STUDIO LMR (an engineering Decision Support System).
The user is planning a rooftop terrace upgrade:
- Selected Lifestyle Zone: ${params.zoneName}
- Net Usable Area: ${params.netSqFt} sq. ft.
- Target Budget: ₹${params.budgetInr.toLocaleString('en-IN')}
- Weather Zone: ${params.weatherZone}
- Execution Tier: ${params.executionTier}

Provide a crisp, professional, high-precision recommendation (under 120 words).
1. Recommend exact high-efficiency product trade-offs (e.g. comparing rubber gym tiles vs decking, UV-stabilized agro netting percentages, or specific paver specs).
2. Emphasize durability in hot/coastal Indian weather.
3. Suggest a cost allocation breakdown.
Be direct, practical, and data-driven. Plain text with short bullet points, no fluff.`;

  if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
    return getSmartFallbackRecommendation(params);
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text || getSmartFallbackRecommendation(params);
  } catch (error) {
    console.warn('Gemini API call failed, using intelligent engineering fallback:', error);
    return getSmartFallbackRecommendation(params);
  }
}

function getSmartFallbackRecommendation(params: {
  budgetInr: number;
  netSqFt: number;
  zoneName: string;
  weatherZone: string;
  executionTier: string;
}): string {
  const { budgetInr, netSqFt, zoneName, weatherZone } = params;

  if (zoneName.toLowerCase().includes('wellness') || zoneName.toLowerCase().includes('calisthenics')) {
    if (budgetInr < 50000) {
      return `For your ₹${budgetInr.toLocaleString('en-IN')} budget on a ${netSqFt} sq. ft. wellness deck in ${weatherZone}:
• Sizing Allocation: Allocate ₹18,000 for 20mm high-density interlocking rubber tiles (covers ~180 sq. ft. active zone).
• Privacy & Shade: Use treated bamboo screening (₹7,500) rather than composite cladding.
• Hardware: Choose powder-coated mild steel multi-grip wall bar (₹4,500) with stainless steel anchor bolts for weather resilience.
• Trade-off: Skip teakwood decking in favor of direct rubber-over-concrete to prevent thermal pooling.`;
    }
    return `For your ₹${budgetInr.toLocaleString('en-IN')} budget on a ${netSqFt} sq. ft. wellness sanctuary:
• Decking: 25mm heavy vulcanized rubber workout grid paired with composite WPC border perimeter.
• Structure: Modular aluminum alloy pull-up/dip calisthenics tower with 316-grade marine stainless fasteners.
• Climate Control: 75% UV-block retractable pergola canopy to drop ambient surface temperature by ~4°C.`;
  }

  if (zoneName.toLowerCase().includes('sunroom') || zoneName.toLowerCase().includes('solarium')) {
    return `For your ₹${budgetInr.toLocaleString('en-IN')} budget on a ${netSqFt} sq. ft. Sunroom in ${weatherZone}:
• Glazing: Use 10mm multi-wall UV-coated polycarbonate sheets instead of heavy double-glazed glass to cut structural load by 60%.
• Frame: Extruded architectural aluminum with thermal break strips to resist high terrace heat.
• Ventilation: Install dual automated louvers to prevent heat entrapment during peak summer.`;
  }

  if (zoneName.toLowerCase().includes('green') || zoneName.toLowerCase().includes('garden')) {
    return `For your ₹${budgetInr.toLocaleString('en-IN')} budget on a ${netSqFt} sq. ft. Rooftop Garden in ${weatherZone}:
• Shade Netting: 60% UV-stabilized virgin HDPE mono-filament green net (withstands 85 km/h monsoon gusts).
• Planters: Light HDPE fabric grow bags (280 GSM) to protect structural slab weight load.
• Irrigation: Automated solar-powered timer drip kit (₹3,200) saves 65% water compared to manual hosing.`;
  }

  return `Engineering Recommendation for ${zoneName} (${netSqFt} sq. ft., ₹${budgetInr.toLocaleString('en-IN')}):
• Structural Clearance: Maintain strict 2.5 ft perimeter access to parapet walls.
• Material Selection: Opt for UV-rated, weather-resistant pavers with thermal reflective topcoat.
• Procurement Allocation: 55% infrastructure/hardscaping, 30% ambient/utility gear, 15% contingency for anchor waterproofing.`;
}
