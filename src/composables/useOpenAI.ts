import OpenAI from 'openai'

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true, // Note: In production, use a backend API
})

export interface UserData {
  name: string
  role: string
  imploymentType: string
  age: number | string
  status: string
  income: string
  phone: string
}

export const useOpenAI = () => {
  const analyzeUserImage = async (imageFile: File): Promise<UserData> => {
    try {
      // Convert image to base64
      const base64Image = await fileToBase64(imageFile)

      const response = await openai.chat.completions.create({
        model: 'gpt-4o',
        messages: [
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: `Analyze this image and extract user/employee information.

IMPORTANT: Return ONLY a valid JSON object without any markdown formatting, code blocks, or explanations.

Expected JSON structure:
{
  "name": "Full name of the person",
  "role": "Job title or role",
  "imploymentType": "Employment type (Full-time, B2B, Part-time, or Contract)",
  "age": "Estimated age as number",
  "status": "Status (Active, Pending, or Cancel)",
  "income": "Estimated income in K format (e.g., 5.2K)",
  "phone": "Phone number if visible"
}

If information is not visible or unclear, use reasonable defaults:
- imploymentType: "B2B"
- status: "Active"
- income: estimated based on role
- phone: empty string if not visible

Return pure JSON only, no markdown, no code blocks, no explanations.`,
              },
              {
                type: 'image_url',
                image_url: {
                  url: base64Image,
                },
              },
            ],
          },
        ],
        max_tokens: 300,
      })

      const content = response.choices[0]?.message?.content
      if (!content) {
        throw new Error('No response from OpenAI')
      }

      console.log('API response:', content)

      // Clean the response - remove markdown code blocks if present
      let cleanedContent = content.trim()

      // Remove ```json and ``` if present
      if (cleanedContent.startsWith('```json')) {
        cleanedContent = cleanedContent.replace(/^```json\s*/, '').replace(/\s*```$/, '')
      } else if (cleanedContent.startsWith('```')) {
        cleanedContent = cleanedContent.replace(/^```\s*/, '').replace(/\s*```$/, '')
      }

      console.log('Cleaned content for parsing:', cleanedContent)

      try {
        // Parse the JSON response
        const userData = JSON.parse(cleanedContent.trim())
        console.log('Parsed user data:', userData)
        return userData as UserData
      } catch (parseError) {
        console.error('JSON parse error:', parseError)
        console.error('Content that failed to parse:', cleanedContent)
        const errorMessage =
          parseError instanceof Error ? parseError.message : 'Unknown parsing error'
        throw new Error(`Failed to parse AI response as JSON: ${errorMessage}`)
      }
    } catch (error) {
      console.error('Error analyzing image:', error)
      throw new Error('Failed to analyze image. Please try again.')
    }
  }

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => {
        const result = reader.result as string
        resolve(result)
      }
      reader.onerror = reject
      reader.readAsDataURL(file)
    })
  }

  return {
    analyzeUserImage,
  }
}
