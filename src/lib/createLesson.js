import axios from 'axios';
import toast from 'react-hot-toast';

export const handleCreateLesson = async (lessonData, fileVideo) => {
    try {
        let uploadIdToSave = null;

        // Nếu người dùng chọn Upload Video lên Mux
        if (lessonData.videoSource === 'upload' && fileVideo) {
            toast.loading("Preparing for upload...", { id: 'upload-toast' });
            
            // 1. Gọi Backend để xin Link Upload
            const { data: muxData } = await axios.get('/api/mux/upload-url');
            const { uploadUrl, uploadId } = muxData;
            
            toast.loading("Uploading video to Mux (0%)...", { id: 'upload-toast' });

            // 2. Dùng axios.put đẩy trực tiếp FILE VIDEO lên URL của Mux
            await axios.put(uploadUrl, fileVideo, {
                headers: { 'Content-Type': fileVideo.type },
                onUploadProgress: (progressEvent) => {
                    const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    toast.loading(`Uploading video to Mux (${percent}%)...`, { id: 'upload-toast' });
                }
            });
            
            // Gán uploadId để gửi cho Backend tạo bài học
            uploadIdToSave = uploadId;
            toast.success("Video uploaded successfully!", { id: 'upload-toast' });
        }

        // 3. Gọi API tạo bài học (Gửi uploadId thay vì URL)
        const response = await axios.post('/api/lesson/create-lesson', {
            title: lessonData.title,
            section_id: lessonData.section_id,
            type: 'video',
            videoSource: lessonData.videoSource,
            video_url: lessonData.video_url, // Chỉ dùng nếu là Youtube
            uploadId: uploadIdToSave,        // Dùng nếu là Mux
            isFree: lessonData.isFree,
            isPublished: lessonData.isPublished
        });

        toast.success("Tạo bài học thành công!");
        console.log("Bài học mới:", response.data);
        
    } catch (error) {
        console.error("Lỗi:", error);
        toast.error("Có lỗi xảy ra trong quá trình tạo bài học", { id: 'upload-toast' });
    }
};
