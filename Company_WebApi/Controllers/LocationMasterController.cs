using Company_WebApi.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;
using Newtonsoft.Json;
using QRCoder;
using System;
using System.Collections.Generic;
using System.Data;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace Company_WebApi.Controllers
{
    [Route("api/[Controller]")]
    [ApiController]
    public class LocationMasterController : ControllerBase
    {
        private readonly CompanyDBContext _context;

        private string SPL_CHAR_FOR_QR = ",";
        private string SPL_CHAR_PIPE = "|";

        public LocationMasterController(CompanyDBContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<LocationMaster>>> GetLocationMaster()
        {
            try
            {
                return await _context.LocationMasters.FromSqlRaw("exec dbo.spSelectLocationMaster").ToListAsync();
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error creating record" + ex);
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<LocationMaster>>> GetLocationMaster(string id)
        {
            var result = await _context.LocationMasters.Where(e => e.Locnum == id).ToListAsync();
            if (result == null)
            {
                throw new Exception("Record Not found");
            }
            return result;
        }

        [HttpPut]
        public async Task<ActionResult<IEnumerable<LocationMaster>>> PutLocationMaster([FromBody] List<LocationMaster> _Locationmasterlist)
        {
            try
            {
                var json = JsonConvert.SerializeObject(_Locationmasterlist);
                DataTable DatTable = (DataTable)JsonConvert.DeserializeObject(json, (typeof(DataTable)));

                var parameter =
                    new SqlParameter("@typLocationMaster", SqlDbType.Structured)
                    {
                        Direction = ParameterDirection.Input,
                        Value = DatTable,
                        TypeName = "dbo.typeLocationMaster"
                    };
                return await _context.LocationMasters.FromSqlRaw("exec dbo.spUpdateLocationMaster @typLocationMaster", parameter).ToListAsync();
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error updating record" + ex);
            }
        }

        [HttpPost]
        public async Task<ActionResult<IEnumerable<LocationMaster>>> PostLocationMaster(List<LocationMaster> _Locationmasterlist)
        {
            try
            {
                var json = JsonConvert.SerializeObject(_Locationmasterlist);
                DataTable DatTable = (DataTable)JsonConvert.DeserializeObject(json, (typeof(DataTable)));

                var parameter =
                    new SqlParameter("@typLocationMaster", SqlDbType.Structured)
                    {
                        Direction = ParameterDirection.Input,
                        Value = DatTable,
                        TypeName = "dbo.typeLocationMaster"
                    };
                return await _context.LocationMasters.FromSqlRaw("exec dbo.spInsertLocationMaster @typLocationMaster", parameter).ToListAsync();
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error inserting record" + ex);
            }
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteLocationMaster()
        {
            try
            {
                var result = await _context.Database.ExecuteSqlRawAsync("exec dbo.spDeleteLocationMaster");
                return Content("Success");
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error deleting record" + ex);
            }
        }


        [Route("[action]")]
        [HttpPost]
        public async Task<ActionResult<IEnumerable<LocationMaster1>>> QRLOCMaster(List<LocationMaster> locationMasters)
        {
            List<LocationMaster1> resultList = new List<LocationMaster1>();
            try
            {

                foreach (LocationMaster locMaster in locationMasters)
                {
                    string qrContent = getQRString(locMaster);

                    LocationMaster1 locationMaster1 = new LocationMaster1();
                    locationMaster1.Locnum = locMaster.Locnum;
                    locationMaster1.Locdesc = locMaster.Locdesc;

                    QRCodeGenerator _qrCode = new QRCodeGenerator();
                    QRCodeData _qrCodeData = _qrCode.CreateQrCode(qrContent, QRCodeGenerator.ECCLevel.Q);
                    QRCode qrCode = new QRCode(_qrCodeData);
                    Bitmap qrCodeImage = qrCode.GetGraphic(20);
                    byte[] bytes = BitmapToBytesCode(qrCodeImage);

                    locationMaster1.base64Str = "data:image/jpg;base64," + Convert.ToBase64String(bytes);
                    resultList.Add(locationMaster1);
                }
            }
            catch (Exception ex)
            {

            }
            return resultList;
        }

        private static byte[] BitmapToBytesCode(Bitmap image)
        {
            using (MemoryStream stream = new MemoryStream())
            {
                image.Save(stream, System.Drawing.Imaging.ImageFormat.Png);
                return stream.ToArray();
            }
        }


        public string getQRString(LocationMaster locationMaster)
        {
            string content = "";
            content += "LOC_NUM" + SPL_CHAR_PIPE + locationMaster.Locnum + SPL_CHAR_FOR_QR;
            content += "LOC_DESC" + SPL_CHAR_PIPE + locationMaster.Locdesc + SPL_CHAR_FOR_QR;
            return content;
        }
    }
}
