﻿using System.Threading.Tasks;

namespace API.Interfaces
{
    public interface IUnitOfWork
    {
        IUserRepository UserRepository { get; }

        ITourPackageRepository TourPackageRepository { get; }
        
        IMessageRepository MessageRepository { get; }

        IQuestionRepository QuestionRepository { get; }

        Task<bool> Complete();

        bool HasChanges();
    }
}