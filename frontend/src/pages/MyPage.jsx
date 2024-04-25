import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import { useState } from 'react'

const MyPage = () => {
    const [image, setImage] = useState('/static/images/avatar/1.jpg')

    const handleImageChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setImage(reader.result)
            }
            reader.readAsDataURL(file)
        }
    }

    return (
        <div>
            <div>
                <Avatar
                    alt="Profile Picture"
                    src={image}
                    sx={{ width: 116, height: 116 }}
                />
            </div>
            <div>
                <input
                    accept="image/*"
                    id="profile-picture-input"
                    type="file"
                    style={{ display: 'none' }}
                    onChange={handleImageChange}
                />
                <label htmlFor="profile-picture-input">
                    <Button variant="contained" component="span">
                        Change Picture
                    </Button>
                </label>
            </div>
        </div>
    )
}

export default MyPage
