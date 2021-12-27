﻿using System.Threading.Tasks;

namespace API.Interfaces
{
    public interface IUnitOfWork
    {
        IUserRepository UserRepository { get; }

        ITourPackageRepository TourPackageRepository { get; }

        IServiceRepository ServiceRepository { get; }
        
        IMessageRepository MessageRepository { get; }

        Task<bool> Complete();

        bool HasChanges();
    }
}