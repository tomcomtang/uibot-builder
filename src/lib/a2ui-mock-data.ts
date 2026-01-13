/**
 * A2UI Mock 数据 - 用于测试和演示
 */

// 1. 用户个人资料卡片
export const userProfileExample = [
  {
    type: 'createSurface',
    surfaceId: 'profile-card',
    dataModel: {
      user: {
        name: 'Alex Chen',
        title: 'Senior Product Designer',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
        email: 'alex.chen@example.com',
        location: 'San Francisco, CA',
        bio: 'Passionate about creating delightful user experiences. Love coffee, travel, and good design.',
        stats: {
          projects: 42,
          followers: 1234,
          following: 567
        }
      }
    },
    components: [
      {
        type: 'Card',
        id: 'profile-card-main',
        elevation: 2,
        children: [
          {
            type: 'Row',
            id: 'profile-header',
            alignment: 'start',
            children: [
              {
                type: 'Image',
                id: 'avatar',
                url: '/user/avatar',
                dataBinding: '/user/avatar',
                width: '80px',
                height: '80px'
              },
              {
                type: 'Column',
                id: 'profile-info',
                alignment: 'start',
                children: [
                  {
                    type: 'Text',
                    id: 'name',
                    text: '/user/name',
                    dataBinding: '/user/name',
                    size: 'extraLarge',
                    style: { fontWeight: '600' }
                  },
                  {
                    type: 'Text',
                    id: 'title',
                    text: '/user/title',
                    dataBinding: '/user/title',
                    size: 'medium',
                    style: { color: 'rgba(255, 255, 255, 0.7)' }
                  }
                ]
              }
            ]
          },
          {
            type: 'Divider',
            id: 'divider-1',
            direction: 'horizontal'
          },
          {
            type: 'Column',
            id: 'profile-details',
            alignment: 'start',
            children: [
              {
                type: 'Text',
                id: 'bio',
                text: '/user/bio',
                dataBinding: '/user/bio',
                size: 'medium'
              },
              {
                type: 'Text',
                id: 'email',
                text: '/user/email',
                dataBinding: '/user/email',
                size: 'small',
                style: { color: 'rgba(255, 255, 255, 0.6)' }
              },
              {
                type: 'Text',
                id: 'location',
                text: '/user/location',
                dataBinding: '/user/location',
                size: 'small',
                style: { color: 'rgba(255, 255, 255, 0.6)' }
              }
            ]
          },
          {
            type: 'Divider',
            id: 'divider-2',
            direction: 'horizontal'
          },
          {
            type: 'Row',
            id: 'stats',
            alignment: 'spaceAround',
            children: [
              {
                type: 'Column',
                id: 'stat-projects',
                alignment: 'center',
                children: [
                  {
                    type: 'Text',
                    id: 'projects-count',
                    text: '/user/stats/projects',
                    dataBinding: '/user/stats/projects',
                    size: 'large',
                    style: { fontWeight: '600' }
                  },
                  {
                    type: 'Text',
                    id: 'projects-label',
                    text: 'Projects',
                    size: 'small',
                    style: { color: 'rgba(255, 255, 255, 0.6)' }
                  }
                ]
              },
              {
                type: 'Column',
                id: 'stat-followers',
                alignment: 'center',
                children: [
                  {
                    type: 'Text',
                    id: 'followers-count',
                    text: '/user/stats/followers',
                    dataBinding: '/user/stats/followers',
                    size: 'large',
                    style: { fontWeight: '600' }
                  },
                  {
                    type: 'Text',
                    id: 'followers-label',
                    text: 'Followers',
                    size: 'small',
                    style: { color: 'rgba(255, 255, 255, 0.6)' }
                  }
                ]
              },
              {
                type: 'Column',
                id: 'stat-following',
                alignment: 'center',
                children: [
                  {
                    type: 'Text',
                    id: 'following-count',
                    text: '/user/stats/following',
                    dataBinding: '/user/stats/following',
                    size: 'large',
                    style: { fontWeight: '600' }
                  },
                  {
                    type: 'Text',
                    id: 'following-label',
                    text: 'Following',
                    size: 'small',
                    style: { color: 'rgba(255, 255, 255, 0.6)' }
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
];

// 2. 联系表单
export const contactFormExample = [
  {
    type: 'createSurface',
    surfaceId: 'contact-form',
    dataModel: {
      form: {
        name: '',
        email: '',
        phone: '',
        company: '',
        message: '',
        subscribe: false
      }
    },
    components: [
      {
        type: 'Card',
        id: 'form-card',
        elevation: 2,
        children: [
          {
            type: 'Text',
            id: 'form-title',
            text: 'Contact Us',
            size: 'extraLarge',
            style: { fontWeight: '600' }
          },
          {
            type: 'Text',
            id: 'form-desc',
            text: 'Fill out the form below and we\'ll get back to you soon.',
            size: 'medium',
            style: { color: 'rgba(255, 255, 255, 0.7)' }
          },
          {
            type: 'Divider',
            id: 'form-divider',
            direction: 'horizontal'
          },
          {
            type: 'Row',
            id: 'form-row-1',
            alignment: 'start',
            children: [
              {
                type: 'TextField',
                id: 'name-field',
                label: 'Name',
                placeholder: 'Enter your name',
                dataBinding: '/form/name'
              },
              {
                type: 'TextField',
                id: 'email-field',
                label: 'Email',
                placeholder: 'your.email@example.com',
                dataBinding: '/form/email'
              }
            ]
          },
          {
            type: 'Row',
            id: 'form-row-2',
            alignment: 'start',
            children: [
              {
                type: 'TextField',
                id: 'phone-field',
                label: 'Phone',
                placeholder: '+1 (555) 123-4567',
                dataBinding: '/form/phone'
              },
              {
                type: 'TextField',
                id: 'company-field',
                label: 'Company',
                placeholder: 'Your company name',
                dataBinding: '/form/company'
              }
            ]
          },
          {
            type: 'TextField',
            id: 'message-field',
            label: 'Message',
            placeholder: 'Tell us what you think...',
            multiline: true,
            dataBinding: '/form/message'
          },
          {
            type: 'CheckBox',
            id: 'subscribe-check',
            label: 'Subscribe to our newsletter',
            dataBinding: '/form/subscribe'
          },
          {
            type: 'Row',
            id: 'form-actions',
            alignment: 'end',
            children: [
              {
                type: 'Button',
                id: 'cancel-btn',
                text: 'Cancel',
                variant: 'outlined',
                action: {
                  name: 'cancel',
                  data: {}
                }
              },
              {
                type: 'Button',
                id: 'submit-btn',
                text: 'Send Message',
                variant: 'primary',
                action: {
                  name: 'submit',
                  data: { formId: 'contact-form' }
                }
              }
            ]
          }
        ]
      }
    ]
  }
];

// 3. 产品列表
export const productListExample = [
  {
    type: 'createSurface',
    surfaceId: 'product-list',
    dataModel: {
      products: [
        {
          id: 1,
          name: 'Wireless Headphones',
          price: '$99.99',
          image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop',
          rating: 4.5
        },
        {
          id: 2,
          name: 'Smart Watch',
          price: '$299.99',
          image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&h=200&fit=crop',
          rating: 4.8
        },
        {
          id: 3,
          name: 'Laptop Stand',
          price: '$49.99',
          image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=200&h=200&fit=crop',
          rating: 4.3
        }
      ]
    },
    components: [
      {
        type: 'Column',
        id: 'product-list-container',
        alignment: 'start',
        children: [
          {
            type: 'Text',
            id: 'list-title',
            text: 'Featured Products',
            size: 'extraLarge',
            style: { fontWeight: '600' }
          },
          {
            type: 'Row',
            id: 'products-row',
            alignment: 'start',
            children: [
              {
                type: 'Card',
                id: 'product-card-1',
                elevation: 1,
                children: [
                  {
                    type: 'Column',
                    id: 'product-1-content',
                    alignment: 'start',
                    children: [
                      {
                        type: 'Image',
                        id: 'product-image-1',
                        url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop',
                        width: '100%',
                        height: '150px'
                      },
                      {
                        type: 'Text',
                        id: 'product-name-1',
                        text: 'Wireless Headphones',
                        size: 'large',
                        style: { fontWeight: '600' }
                      },
                      {
                        type: 'Text',
                        id: 'product-price-1',
                        text: '$99.99',
                        size: 'medium',
                        style: { color: '#6633ee', fontWeight: '500' }
                      },
                      {
                        type: 'Button',
                        id: 'add-to-cart-1',
                        text: 'Add to Cart',
                        variant: 'primary',
                        action: {
                          name: 'addToCart',
                          data: { productId: 1 }
                        }
                      }
                    ]
                  }
                ]
              },
              {
                type: 'Card',
                id: 'product-card-2',
                elevation: 1,
                children: [
                  {
                    type: 'Column',
                    id: 'product-2-content',
                    alignment: 'start',
                    children: [
                      {
                        type: 'Image',
                        id: 'product-image-2',
                        url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&h=200&fit=crop',
                        width: '100%',
                        height: '150px'
                      },
                      {
                        type: 'Text',
                        id: 'product-name-2',
                        text: 'Smart Watch',
                        size: 'large',
                        style: { fontWeight: '600' }
                      },
                      {
                        type: 'Text',
                        id: 'product-price-2',
                        text: '$299.99',
                        size: 'medium',
                        style: { color: '#6633ee', fontWeight: '500' }
                      },
                      {
                        type: 'Button',
                        id: 'add-to-cart-2',
                        text: 'Add to Cart',
                        variant: 'primary',
                        action: {
                          name: 'addToCart',
                          data: { productId: 2 }
                        }
                      }
                    ]
                  }
                ]
              },
              {
                type: 'Card',
                id: 'product-card-3',
                elevation: 1,
                children: [
                  {
                    type: 'Column',
                    id: 'product-3-content',
                    alignment: 'start',
                    children: [
                      {
                        type: 'Image',
                        id: 'product-image-3',
                        url: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=200&h=200&fit=crop',
                        width: '100%',
                        height: '150px'
                      },
                      {
                        type: 'Text',
                        id: 'product-name-3',
                        text: 'Laptop Stand',
                        size: 'large',
                        style: { fontWeight: '600' }
                      },
                      {
                        type: 'Text',
                        id: 'product-price-3',
                        text: '$49.99',
                        size: 'medium',
                        style: { color: '#6633ee', fontWeight: '500' }
                      },
                      {
                        type: 'Button',
                        id: 'add-to-cart-3',
                        text: 'Add to Cart',
                        variant: 'primary',
                        action: {
                          name: 'addToCart',
                          data: { productId: 3 }
                        }
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
];

// 4. 设置面板
export const settingsPanelExample = [
  {
    type: 'createSurface',
    surfaceId: 'settings-panel',
    dataModel: {
      settings: {
        notifications: {
          email: true,
          push: false,
          sms: false
        },
        volume: 75
      }
    },
    components: [
      {
        type: 'Card',
        id: 'settings-card',
        elevation: 2,
        children: [
          {
            type: 'Text',
            id: 'settings-title',
            text: 'Settings',
            size: 'extraLarge',
            style: { fontWeight: '600' }
          },
          {
            type: 'Divider',
            id: 'divider-1',
            direction: 'horizontal'
          },
          {
            type: 'Text',
            id: 'notifications-title',
            text: 'Notifications',
            size: 'large',
            style: { fontWeight: '500' }
          },
          {
            type: 'CheckBox',
            id: 'email-notif',
            label: 'Email notifications',
            dataBinding: '/settings/notifications/email'
          },
          {
            type: 'CheckBox',
            id: 'push-notif',
            label: 'Push notifications',
            dataBinding: '/settings/notifications/push'
          },
          {
            type: 'CheckBox',
            id: 'sms-notif',
            label: 'SMS notifications',
            dataBinding: '/settings/notifications/sms'
          },
          {
            type: 'Divider',
            id: 'divider-2',
            direction: 'horizontal'
          },
          {
            type: 'Text',
            id: 'volume-title',
            text: 'Volume',
            size: 'large',
            style: { fontWeight: '500' }
          },
          {
            type: 'Slider',
            id: 'volume-slider',
            min: 0,
            max: 100,
            step: 1,
            dataBinding: '/settings/volume'
          },
          {
            type: 'Divider',
            id: 'divider-3',
            direction: 'horizontal'
          },
          {
            type: 'Row',
            id: 'settings-actions',
            alignment: 'end',
            children: [
              {
                type: 'Button',
                id: 'save-btn',
                text: 'Save Settings',
                variant: 'primary',
                action: {
                  name: 'saveSettings',
                  data: {}
                }
              }
            ]
          }
        ]
      }
    ]
  }
];

// 5. Table 示例
export const tableExample = [
  {
    type: 'createSurface',
    surfaceId: 'table-demo',
    dataModel: {
      users: [
        { id: 1, name: 'Alice Johnson', email: 'alice@example.com', role: 'Admin', status: 'Active' },
        { id: 2, name: 'Bob Smith', email: 'bob@example.com', role: 'User', status: 'Active' },
        { id: 3, name: 'Carol Davis', email: 'carol@example.com', role: 'Editor', status: 'Inactive' },
        { id: 4, name: 'David Wilson', email: 'david@example.com', role: 'User', status: 'Active' }
      ]
    },
    components: [
      {
        type: 'Card',
        id: 'table-card',
        elevation: 2,
        children: [
          {
            type: 'Text',
            id: 'table-title',
            text: 'User Management',
            size: 'extraLarge',
            style: { fontWeight: '600' }
          },
          {
            type: 'Text',
            id: 'table-desc',
            text: 'Manage your team members and their permissions.',
            size: 'medium',
            style: { color: 'rgba(255, 255, 255, 0.7)' }
          },
          {
            type: 'Divider',
            id: 'table-divider',
            direction: 'horizontal'
          },
          {
            type: 'Table',
            id: 'users-table',
            dataBinding: '/users',
            columns: [
              { key: 'id', title: 'ID', width: '80px' },
              { key: 'name', title: 'Name', width: '150px' },
              { key: 'email', title: 'Email', width: '200px' },
              { key: 'role', title: 'Role', width: '100px' },
              { key: 'status', title: 'Status', width: '100px' }
            ]
          }
        ]
      }
    ]
  }
];

// 6. 数据展示组件示例
export const dataVisualizationExample = [
  {
    type: 'createSurface',
    surfaceId: 'data-visualization-demo',
    dataModel: {
      sales: [
        { label: 'Jan', value: 65, color: '#6633ee' },
        { label: 'Feb', value: 78, color: '#8b5cf6' },
        { label: 'Mar', value: 52, color: '#a855f7' },
        { label: 'Apr', value: 91, color: '#c084fc' }
      ],
      progress: {
        completed: 75,
        inProgress: 60,
        pending: 30
      },
      stats: {
        totalUsers: 12450,
        revenue: 98750,
        orders: 1250
      }
    },
    components: [
      {
        type: 'Card',
        id: 'data-card',
        elevation: 2,
        children: [
          {
            type: 'Text',
            id: 'data-title',
            text: 'Data Visualization Dashboard',
            size: 'extraLarge',
            style: { fontWeight: '600' }
          },
          {
            type: 'Divider',
            id: 'data-divider-1',
            direction: 'horizontal'
          },
          {
            type: 'Row',
            id: 'stats-row',
            alignment: 'spaceAround',
            children: [
              {
                type: 'Statistic',
                id: 'users-stat',
                title: 'Total Users',
                value: '/stats/totalUsers',
                dataBinding: '/stats/totalUsers',
                suffix: '+',
                description: '↗ 12% from last month'
              },
              {
                type: 'Statistic',
                id: 'revenue-stat',
                title: 'Revenue',
                value: '/stats/revenue',
                dataBinding: '/stats/revenue',
                prefix: '$',
                description: '↗ 8% from last month'
              },
              {
                type: 'Statistic',
                id: 'orders-stat',
                title: 'Orders',
                value: '/stats/orders',
                dataBinding: '/stats/orders',
                description: '↗ 15% from last month'
              }
            ]
          },
          {
            type: 'Divider',
            id: 'data-divider-2',
            direction: 'horizontal'
          },
          {
            type: 'Chart',
            id: 'sales-chart',
            chartType: 'bar',
            width: 400,
            height: 250,
            data: '/sales',
            dataBinding: '/sales'
          },
          {
            type: 'Divider',
            id: 'data-divider-3',
            direction: 'horizontal'
          },
          {
            type: 'Column',
            id: 'progress-section',
            alignment: 'start',
            children: [
              {
                type: 'Text',
                id: 'progress-title',
                text: 'Project Progress',
                size: 'large',
                style: { fontWeight: '500' }
              },
              {
                type: 'Progress',
                id: 'completed-progress',
                label: 'Completed Tasks',
                value: '/progress/completed',
                dataBinding: '/progress/completed',
                color: '#4ade80'
              },
              {
                type: 'Progress',
                id: 'inprogress-progress',
                label: 'In Progress',
                value: '/progress/inProgress',
                dataBinding: '/progress/inProgress',
                color: '#fbbf24'
              },
              {
                type: 'Progress',
                id: 'pending-progress',
                label: 'Pending',
                value: '/progress/pending',
                dataBinding: '/progress/pending',
                color: '#f87171'
              }
            ]
          },
          {
            type: 'Row',
            id: 'badges-row',
            alignment: 'start',
            children: [
              {
                type: 'Badge',
                id: 'status-badge-1',
                text: 'Active',
                variant: 'success'
              },
              {
                type: 'Badge',
                id: 'status-badge-2',
                text: 'Premium',
                variant: 'primary'
              },
              {
                type: 'Badge',
                id: 'status-badge-3',
                text: 'New',
                variant: 'warning'
              }
            ]
          }
        ]
      }
    ]
  }
];

// 7. 媒体组件示例
export const mediaExample = [
  {
    type: 'createSurface',
    surfaceId: 'media-demo',
    dataModel: {
      gallery: [
        'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1448375240586-882707db888b?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop'
      ]
    },
    components: [
      {
        type: 'Card',
        id: 'media-card',
        elevation: 2,
        children: [
          {
            type: 'Text',
            id: 'media-title',
            text: 'Media Components',
            size: 'extraLarge',
            style: { fontWeight: '600' }
          },
          {
            type: 'Text',
            id: 'media-desc',
            text: 'Showcase of video, audio, and gallery components.',
            size: 'medium',
            style: { color: 'rgba(255, 255, 255, 0.7)' }
          },
          {
            type: 'Divider',
            id: 'media-divider-1',
            direction: 'horizontal'
          },
          {
            type: 'Text',
            id: 'video-section-title',
            text: 'Video Player',
            size: 'large',
            style: { fontWeight: '500' }
          },
          {
            type: 'Video',
            id: 'demo-video',
            src: 'https://www.w3schools.com/html/mov_bbb.mp4',
            poster: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=600&h=400&fit=crop',
            controls: true,
            width: '100%',
            height: '300px'
          },
          {
            type: 'Divider',
            id: 'media-divider-2',
            direction: 'horizontal'
          },
          {
            type: 'Text',
            id: 'audio-section-title',
            text: 'Audio Player',
            size: 'large',
            style: { fontWeight: '500' }
          },
          {
            type: 'Audio',
            id: 'demo-audio',
            src: 'https://www.w3schools.com/html/horse.mp3',
            controls: true
          },
          {
            type: 'Divider',
            id: 'media-divider-3',
            direction: 'horizontal'
          },
          {
            type: 'Text',
            id: 'gallery-section-title',
            text: 'Image Gallery',
            size: 'large',
            style: { fontWeight: '500' }
          },
          {
            type: 'Gallery',
            id: 'demo-gallery',
            images: '/gallery',
            dataBinding: '/gallery'
          }
        ]
      }
    ]
  }
];

// 8. 高级组件示例
export const advancedExample = [
  {
    type: 'createSurface',
    surfaceId: 'advanced-demo',
    dataModel: {
      timeline: [
        {
          time: '2024-01-15',
          title: 'Project Started',
          description: 'Initial project setup and planning phase completed.',
          color: '#4ade80'
        },
        {
          time: '2024-02-01',
          title: 'Design Phase',
          description: 'UI/UX design and wireframes finalized.',
          color: '#6633ee'
        },
        {
          time: '2024-02-15',
          title: 'Development',
          description: 'Core development phase in progress.',
          color: '#fbbf24'
        },
        {
          time: '2024-03-01',
          title: 'Testing',
          description: 'Quality assurance and testing phase.',
          color: '#f87171'
        }
      ],
      treeData: [
        {
          label: 'Root Folder',
          children: [
            {
              label: 'Documents',
              children: [
                { label: 'Report.pdf' },
                { label: 'Presentation.pptx' }
              ]
            },
            {
              label: 'Images',
              children: [
                { label: 'photo1.jpg' },
                { label: 'photo2.png' }
              ]
            },
            { label: 'README.md' }
          ]
        }
      ],
      carousel: [
        {
          image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop',
          title: 'Beautiful Landscape',
          description: 'Stunning mountain views and natural scenery.'
        },
        {
          image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&h=400&fit=crop',
          title: 'Forest Path',
          description: 'Peaceful walking trails through the forest.'
        },
        {
          image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=600&h=400&fit=crop',
          title: 'Ocean View',
          description: 'Breathtaking coastal landscapes and ocean waves.'
        }
      ]
    },
    components: [
      {
        type: 'Card',
        id: 'advanced-card',
        elevation: 2,
        children: [
          {
            type: 'Text',
            id: 'advanced-title',
            text: 'Advanced Components',
            size: 'extraLarge',
            style: { fontWeight: '600' }
          },
          {
            type: 'Divider',
            id: 'advanced-divider-1',
            direction: 'horizontal'
          },
          {
            type: 'Row',
            id: 'advanced-row-1',
            alignment: 'start',
            children: [
              {
                type: 'Column',
                id: 'calendar-column',
                alignment: 'start',
                children: [
                  {
                    type: 'Text',
                    id: 'calendar-title',
                    text: 'Calendar',
                    size: 'large',
                    style: { fontWeight: '500' }
                  },
                  {
                    type: 'Calendar',
                    id: 'demo-calendar'
                  }
                ]
              },
              {
                type: 'Column',
                id: 'tree-column',
                alignment: 'start',
                children: [
                  {
                    type: 'Text',
                    id: 'tree-title',
                    text: 'File Tree',
                    size: 'large',
                    style: { fontWeight: '500' }
                  },
                  {
                    type: 'Tree',
                    id: 'demo-tree',
                    data: '/treeData',
                    dataBinding: '/treeData'
                  }
                ]
              }
            ]
          },
          {
            type: 'Divider',
            id: 'advanced-divider-2',
            direction: 'horizontal'
          },
          {
            type: 'Text',
            id: 'timeline-title',
            text: 'Project Timeline',
            size: 'large',
            style: { fontWeight: '500' }
          },
          {
            type: 'Timeline',
            id: 'demo-timeline',
            items: '/timeline',
            dataBinding: '/timeline'
          },
          {
            type: 'Divider',
            id: 'advanced-divider-3',
            direction: 'horizontal'
          },
          {
            type: 'Text',
            id: 'carousel-title',
            text: 'Image Carousel',
            size: 'large',
            style: { fontWeight: '500' }
          },
          {
            type: 'Carousel',
            id: 'demo-carousel',
            items: '/carousel',
            dataBinding: '/carousel',
            autoplay: true,
            interval: 4000
          }
        ]
      }
    ]
  }
];

// 导出所有示例
export const allMockExamples = {
  userProfile: userProfileExample,
  contactForm: contactFormExample,
  productList: productListExample,
  settingsPanel: settingsPanelExample,
  table: tableExample,
  dataVisualization: dataVisualizationExample,
  media: mediaExample,
  advanced: advancedExample
};