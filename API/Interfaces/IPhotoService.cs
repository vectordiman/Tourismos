using System.Threading.Tasks;
using API.Services;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Http;

namespace API.Interfaces
{
    public interface IPhotoService
    {
        Task<ImageUploadResult> AddPhotoAsync(IFormFile file, PhotoType type);
        
        Task<DeletionResult> DeletePhotoAsync(string publicId);
    }
}