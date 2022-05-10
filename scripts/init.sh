###
 # @Author: Quarter
 # @Date: 2022-04-21 09:27:46
 # @LastEditTime: 2022-04-26 12:14:30
 # @LastEditors: Quarter
 # @Description: init 脚本
 # @FilePath: /vue2-template/scripts/init.sh
### 
# 验证项目名称
if [[ "${PROJECT_NAME}" == "" ]]; then
  echo "获取项目名称失败"
  exit 1
fi
# 验证钉钉 token 配置
if [[ "${DINGTALK}" == "" ]]; then
  echo "钉钉通知 token 未配置"
  exit 1
fi
# 验证 oss 配置
if [[ "${OSS_ENABLE}" == true ]]; then
  # 验证二进制文件的对象存储
  if [[ "${PROJECT_OSS}" == "" ]]; then
    echo "获取项目对象存储位置失败"
    exit 1
  fi
  # 验证二进制文件的对象存储
  if [[ "${OSS_KEY}" == "" ]] || [[ "${OSS_SECRET}" == "" ]]; then
    echo "获取对象存储配置失败"
    exit 1
  fi
fi
# 验证发布的对象存储
if [[ "${DEPLOY_KEY}" == "" ]] || [[ "${DEPLOY_SECRET}" == "" ]]; then
  echo "获取部署文件存储配置失败"
  exit 1
fi