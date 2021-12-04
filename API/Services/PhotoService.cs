using System.Threading.Tasks;
using API.Helpers;
using API.Interfaces;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;

namespace API.Services
{
    public class PhotoService : IPhotoService
    {
        private readonly Cloudinary _cloudinary;

        public PhotoService(IOptions<CloudinarySettings> config)
        {
            var acc = new Account
            (
                config.Value.CloudName,
                config.Value.ApiKey,
                config.Value.ApiSecret
            );

            _cloudinary = new Cloudinary(acc);
        }

        private Transformation GetTransformation(PhotoType type)
        {
            var transformation = new Transformation();
            switch (type)
            {
                case PhotoType.User:
                    transformation.Height(500).Width(500).Crop("fill").Gravity("face");
                    break;
                case PhotoType.TourPackage:
                    transformation.Height(1080).Width(1920);
                    break;
            }

            return transformation;
        }

        public async Task<ImageUploadResult> AddPhotoAsync(IFormFile file, PhotoType photoType)
        {
            var uploadResult = new ImageUploadResult();
            var transformation = GetTransformation(photoType);
            if (file.Length > 0)
            {
                using var stream = file.OpenReadStream();
                var uploadParams = new ImageUploadParams
                {
                    File = new FileDescription(file.FileName, stream),
                    Transformation = transformation
                };
                uploadResult = await _cloudinary.UploadAsync(uploadParams);
            }
            return uploadResult;
        }

        public async Task<DeletionResult> DeletePhotoAsync(string publicId)
        {
            var deleteParams = new DeletionParams(publicId);

            var result = await _cloudinary.DestroyAsync(deleteParams);

            return result;
        }
    }

    public enum PhotoType
    {
        User,
        TourPackage
    }
}