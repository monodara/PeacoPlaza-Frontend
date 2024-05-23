import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { AppState, useAppDispatch } from '../../redux/store';
import { usersActions } from './userSlice';
import { UserReadDto } from './userDto';

interface UploadResult {
  url: string;
}
interface AvatarUploadProps {
  updateUser: (newUserData: UserReadDto) => void;
}

const AvatarUpload: React.FC = () => {
  const dispatch = useAppDispatch();

  const [progress, setProgress] = useState<number>(0);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [result, setResult] = useState<UploadResult | null>(null);

    let user = useSelector((state: AppState) => state.users.userLoggedIn);
  const token = useSelector((state: AppState) => state.users.token);

  const uploadFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const data = new FormData();
    data.append('AvatarImage', file);
    data.append('UserId', user?.id??"");

    setIsUploading(true);
    try {
      const response = await fetch('http://localhost:5074/api/v1/users/upload-avatar', {
        method: 'POST',
        body: data,
        headers: {
          "Authorization" : `Bearer ${token}`,
        },
      });
      if (!response.ok) {
          throw new Error('Upload failed');
        }     
        const responseData = await response.json();
        dispatch(usersActions.setUser(responseData))
      setResult(responseData);
    } catch (error) {
      console.error('Upload failed', error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div>
      <h2>Upload Avatar</h2>
      <input type="file" id="file-input" onChange={uploadFile} />
      <button type="submit" disabled={isUploading}>
        Upload
      </button>
      {/* {result && (
        <div>
          <h3>上传结果</h3>
          <img src={result.url} alt="上传结果" />
        </div>
      )} */}
    </div>
  );
};
export default AvatarUpload;


