import { supabase } from '../lib/supabase'

export interface IProjectPost {
  title: string
  description: string
  technologies: string[]
  imageUrl?: string
  demoUrl?: string
  githubUrl?: string
  status?: 'completed' | 'in-progress' | 'planning'
  featured?: boolean
}

class BaseApiCall {
  private isConfigured (): boolean {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
    return url !== '' && !url.includes('your-supabase-project-id')
  }

  Project = {
    create: async (data: IProjectPost) => {
      if (!this.isConfigured()) {
        throw new Error('Supabase credentials not configured in .env.local')
      }
      const payload = {
        ...data,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
      const { data: result, error } = await supabase
        .from('projects')
        .insert([payload])
        .select()
        .single()

      if (error) throw new Error(error.message)
      return { data: { success: true, data: result } }
    },

    getAll: async () => {
      if (!this.isConfigured()) {
        console.warn('Supabase URL/Key is using placeholder values in .env.local')
        return { data: { success: true, data: [] } }
      }

      try {
        const { data: projects, error } = await supabase
          .from('projects')
          .select('*')
          .order('createdAt', { ascending: false })

        if (error) {
          console.error('Supabase fetch error:', error.message)
          return { data: { success: false, data: [] } }
        }
        return { data: { success: true, data: projects || [] } }
      } catch (err: any) {
        console.error('Supabase fetch exception:', err)
        return { data: { success: false, data: [] } }
      }
    },

    getById: async (id: string) => {
      if (!this.isConfigured()) {
        return { data: { success: false, data: null } }
      }
      try {
        const { data: project, error } = await supabase
          .from('projects')
          .select('*')
          .eq('id', id)
          .single()

        if (error) throw new Error(error.message)
        return { data: { success: true, data: project } }
      } catch (err: any) {
        return { data: { success: false, data: null } }
      }
    },

    getBySlug: async (slug: string) => {
      if (!this.isConfigured()) {
        return { data: { success: false, data: null } }
      }
      try {
        const { data: project, error } = await supabase
          .from('projects')
          .select('*')
          .or(`id.eq.${slug},title.ilike.%${slug.replace(/-/g, ' ')}%`)
          .limit(1)
          .maybeSingle()

        if (error) throw new Error(error.message)
        return { data: { success: true, data: project } }
      } catch (err: any) {
        return { data: { success: false, data: null } }
      }
    },

    update: async (id: string, data: Partial<IProjectPost>) => {
      if (!this.isConfigured()) {
        throw new Error('Supabase credentials not configured in .env.local')
      }
      const payload = {
        ...data,
        updatedAt: new Date().toISOString()
      }
      const { data: result, error } = await supabase
        .from('projects')
        .update(payload)
        .eq('id', id)
        .select()
        .single()

      if (error) throw new Error(error.message)
      return { data: { success: true, data: result } }
    },

    delete: async (id: string) => {
      if (!this.isConfigured()) {
        throw new Error('Supabase credentials not configured in .env.local')
      }
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id)

      if (error) throw new Error(error.message)
      return { data: { success: true, message: 'Project deleted' } }
    }
  }

  Upload = {
    create: async (data: { dokumen: File } | File, setProgress?: (progress: number) => void) => {
      if (!this.isConfigured()) {
        throw new Error('Supabase credentials not configured in .env.local')
      }
      const file = data instanceof File ? data : data.dokumen
      if (!file) throw new Error('No file provided for upload')

      const fileExt = file.name.split('.').pop()
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`
      const filePath = `projects/${fileName}`

      if (setProgress) setProgress(30)

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('portfolio-projects')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: true
        })

      if (uploadError) {
        console.error('Supabase storage upload error:', uploadError)
        throw new Error(uploadError.message)
      }

      if (setProgress) setProgress(80)

      const { data: publicUrlData } = supabase.storage
        .from('portfolio-projects')
        .getPublicUrl(uploadData.path)

      if (setProgress) setProgress(100)

      return {
        data: {
          success: true,
          data: {
            imageUrl: publicUrlData.publicUrl
          }
        }
      }
    }
  }
}

const ApiCall = new BaseApiCall()
export default ApiCall
