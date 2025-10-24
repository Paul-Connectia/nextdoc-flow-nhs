-- Create storage bucket for mentor documents
INSERT INTO storage.buckets (id, name, public) 
VALUES ('mentor-documents', 'mentor-documents', false);

-- Create RLS policies for mentor documents bucket
CREATE POLICY "Users can upload their own mentor documents" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'mentor-documents' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can view their own mentor documents" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'mentor-documents' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Admins can view all mentor documents" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'mentor-documents' AND EXISTS (
  SELECT 1 FROM public.user_roles 
  WHERE user_id = auth.uid() AND role = 'admin'
));