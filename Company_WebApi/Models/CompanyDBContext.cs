using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

#nullable disable

namespace Company_WebApi.Models
{
    public partial class CompanyDBContext : DbContext
    {
        public CompanyDBContext()
        {
        }

        public CompanyDBContext(DbContextOptions<CompanyDBContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Grnmaster> Grnmasters { get; set; }
        public virtual DbSet<LocationMaster> LocationMasters { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                //#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseSqlServer("Server=.\\sqlexpress;Database=CompanyDB;Trusted_Connection=True;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("Relational:Collation", "Latin1_General_CI_AI");

            modelBuilder.Entity<Grnmaster>(entity =>
            {
                entity.HasKey(e => e.GrnpovnamePnum)
                    .HasName("PK__GRNMaste__9C5EEC74EBCF4425");

                entity.ToTable("GRNMaster");

                entity.Property(e => e.GrnpovnamePnum)
                    .HasMaxLength(400)
                    .IsUnicode(false)
                    .HasColumnName("GRNPOVnamePnum");

                entity.Property(e => e.Grndate)
                    .HasColumnType("datetime")
                    .HasColumnName("GRNDate");

                entity.Property(e => e.Location)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Partdesc)
                    .HasMaxLength(150)
                    .IsUnicode(false);

                entity.Property(e => e.Partnumber)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.PoorMonumber)
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .HasColumnName("POorMONumber");

                entity.Property(e => e.Vendorname)
                    .HasMaxLength(150)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<LocationMaster>(entity =>
            {
                entity.HasKey(e => e.Locnum)
                    .HasName("PK__Location__E4804B03B63A7ECF");

                entity.ToTable("LocationMaster");

                entity.Property(e => e.Locnum)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Locdesc)
                    .HasMaxLength(150)
                    .IsUnicode(false);
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
