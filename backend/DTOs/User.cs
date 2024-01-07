namespace DTOs
{
    public class UserDataResponse
    {
        public bool Success { get; set; }
        public string Message { get; set; } = string.Empty;
        public UserData? User { get; set; } = null;
    }

    public class UserData
    {
        public string Id { get; set; } = string.Empty;
        public string UserName { get; set; } = string.Empty;
        public byte[] ProfilePicture { get; set; } = Array.Empty<byte>();
    }

    public class ChangeUserNameRequest
    {
        public string NewUserName { get; set; } = string.Empty;
    }

    public class ChangePasswordRequest
    {
        public string OldPassword { get; set; } = string.Empty;
        public string NewPassword { get; set; } = string.Empty;
    }
}