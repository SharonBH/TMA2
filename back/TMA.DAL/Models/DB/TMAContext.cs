using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace TMA.DAL.Models.DB
{
    public partial class TMAContext : DbContext
    {
        public TMAContext()
        {
        }

        public TMAContext(DbContextOptions<TMAContext> options)
            : base(options)
        {
        }

        public virtual DbSet<AspNetRoleClaims> AspNetRoleClaims { get; set; }
        public virtual DbSet<AspNetRoles> AspNetRoles { get; set; }
        public virtual DbSet<AspNetUserClaims> AspNetUserClaims { get; set; }
        public virtual DbSet<AspNetUserLogins> AspNetUserLogins { get; set; }
        public virtual DbSet<AspNetUserRoles> AspNetUserRoles { get; set; }
        public virtual DbSet<AspNetUsers> AspNetUsers { get; set; }
        public virtual DbSet<AspNetUserTokens> AspNetUserTokens { get; set; }
        public virtual DbSet<EventResults> EventResults { get; set; }
        public virtual DbSet<Events> Events { get; set; }
        public virtual DbSet<Groups> Groups { get; set; }
        public virtual DbSet<LkpEvent> LkpEvent { get; set; }
        public virtual DbSet<LkpTournamentType> LkpTournamentType { get; set; }
        public virtual DbSet<Tournaments> Tournaments { get; set; }
        public virtual DbSet<UsersAvatar> UsersAvatar { get; set; }
        public virtual DbSet<UsersGroups> UsersGroups { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseSqlServer("Server=etl-adf-poc.database.windows.net;Database=TMA;User ID=beehive_etl;Password=Prototype2018;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<AspNetRoleClaims>(entity =>
            {
                entity.HasIndex(e => e.RoleId);

                entity.Property(e => e.RoleId).IsRequired();

                entity.HasOne(d => d.Role)
                    .WithMany(p => p.AspNetRoleClaims)
                    .HasForeignKey(d => d.RoleId);
            });

            modelBuilder.Entity<AspNetRoles>(entity =>
            {
                entity.HasIndex(e => e.NormalizedName)
                    .HasName("RoleNameIndex");

                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.Name).HasMaxLength(256);

                entity.Property(e => e.NormalizedName).HasMaxLength(256);
            });

            modelBuilder.Entity<AspNetUserClaims>(entity =>
            {
                entity.HasIndex(e => e.UserId);

                entity.Property(e => e.UserId).IsRequired();

                entity.HasOne(d => d.User)
                    .WithMany(p => p.AspNetUserClaims)
                    .HasForeignKey(d => d.UserId);
            });

            modelBuilder.Entity<AspNetUserLogins>(entity =>
            {
                entity.HasKey(e => new { e.LoginProvider, e.ProviderKey });

                entity.HasIndex(e => e.UserId);

                entity.Property(e => e.UserId).IsRequired();

                entity.HasOne(d => d.User)
                    .WithMany(p => p.AspNetUserLogins)
                    .HasForeignKey(d => d.UserId);
            });

            modelBuilder.Entity<AspNetUserRoles>(entity =>
            {
                entity.HasKey(e => new { e.UserId, e.RoleId });

                entity.HasIndex(e => e.RoleId);

                entity.HasIndex(e => e.UserId);

                entity.HasOne(d => d.Role)
                    .WithMany(p => p.AspNetUserRoles)
                    .HasForeignKey(d => d.RoleId);

                entity.HasOne(d => d.User)
                    .WithMany(p => p.AspNetUserRoles)
                    .HasForeignKey(d => d.UserId);
            });

            modelBuilder.Entity<AspNetUsers>(entity =>
            {
                entity.HasIndex(e => e.NormalizedEmail)
                    .HasName("EmailIndex");

                entity.HasIndex(e => e.NormalizedUserName)
                    .HasName("UserNameIndex")
                    .IsUnique();

                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.Email).HasMaxLength(256);

                entity.Property(e => e.Name).HasMaxLength(256);

                entity.Property(e => e.NormalizedEmail).HasMaxLength(256);

                entity.Property(e => e.NormalizedUserName).HasMaxLength(256);

                entity.Property(e => e.UserName).HasMaxLength(256);
            });

            modelBuilder.Entity<AspNetUserTokens>(entity =>
            {
                entity.HasKey(e => new { e.UserId, e.LoginProvider, e.Name });
            });

            modelBuilder.Entity<EventResults>(entity =>
            {
                entity.HasKey(e => new { e.UserId, e.EventId });

                entity.HasOne(d => d.Event)
                    .WithMany(p => p.EventResults)
                    .HasForeignKey(d => d.EventId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_EventResults_Events");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.EventResults)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_EventResults_AspNetUsers");
            });

            modelBuilder.Entity<Events>(entity =>
            {
                entity.HasKey(e => e.EventId);

                entity.Property(e => e.EventDate)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.EventName)
                    .IsRequired()
                    .HasMaxLength(150);

                entity.HasOne(d => d.Tournament)
                    .WithMany(p => p.Events)
                    .HasForeignKey(d => d.TournamentId)
                    .HasConstraintName("FK_Events_Tournaments");
            });

            modelBuilder.Entity<Groups>(entity =>
            {
                entity.HasKey(e => e.GroupId);

                entity.Property(e => e.CreatedDate)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.GroupName)
                    .IsRequired()
                    .HasMaxLength(250);
            });

            modelBuilder.Entity<LkpEvent>(entity =>
            {
                entity.HasKey(e => e.EventTypeId);

                entity.ToTable("LKP_Event");

                entity.Property(e => e.EventTypeId).ValueGeneratedNever();

                entity.Property(e => e.EventTypeName)
                    .IsRequired()
                    .HasMaxLength(150);
            });

            modelBuilder.Entity<LkpTournamentType>(entity =>
            {
                entity.HasKey(e => e.TournamentTypeId);

                entity.ToTable("LKP_TournamentType");

                entity.Property(e => e.TournamentTypeName)
                    .IsRequired()
                    .HasMaxLength(150);
            });

            modelBuilder.Entity<Tournaments>(entity =>
            {
                entity.HasKey(e => e.TournamentId);

                entity.Property(e => e.EndDate).HasColumnType("date");

                entity.Property(e => e.StartDate).HasColumnType("date");

                entity.Property(e => e.TournamentName)
                    .IsRequired()
                    .HasMaxLength(150);

                entity.HasOne(d => d.EventType)
                    .WithMany(p => p.Tournaments)
                    .HasForeignKey(d => d.EventTypeId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Tournaments_LKP_Event");

                entity.HasOne(d => d.Group)
                    .WithMany(p => p.Tournaments)
                    .HasForeignKey(d => d.GroupId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Tournaments_Groups");
            });

            modelBuilder.Entity<UsersAvatar>(entity =>
            {
                entity.HasKey(e => e.UserId);

                entity.Property(e => e.UserId).ValueGeneratedNever();

                entity.Property(e => e.Avatar).IsRequired();

                entity.HasOne(d => d.User)
                    .WithOne(p => p.UsersAvatar)
                    .HasForeignKey<UsersAvatar>(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_UsersAvatar_AspNetUsers");
            });

            modelBuilder.Entity<UsersGroups>(entity =>
            {
                entity.HasKey(e => new { e.UserId, e.GroupId });

                entity.HasOne(d => d.Group)
                    .WithMany(p => p.UsersGroups)
                    .HasForeignKey(d => d.GroupId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_UsersGroups_Groups");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.UsersGroups)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_UsersGroups_AspNetUsers");
            });
        }
    }
}
